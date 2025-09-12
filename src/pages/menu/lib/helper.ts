import type { TableColumnsType, UploadFile } from "antd";
import type { Category } from "src/store/category/category.type";
import type { Ingredient } from "src/store/ingredient/ingredient.type";
import type { Menu, MenuPayload } from "src/store/menu/menu.type";
import type { CloudinaryResponse } from "src/types/common";

export function addDynamicFiltersForColumnsByColumnKey<TTableType, TDataList extends { name: string }>(
  columns: TableColumnsType<TTableType>,
  columnKey: string,
  dataList?: TDataList[],
): TableColumnsType<TTableType> {
  if (!dataList?.length) return columns;
  const nameFilter = dataList.map((item) => ({
    text: item.name,
    value: item.name,
  }));
  const nameColumn = columns.find((col) => col.key === columnKey);
  if (!nameColumn) return columns;
  return columns.map((col) => (col.key === columnKey ? { ...col, filters: nameFilter } : col));
}

export function transformCloudinaryImageUploadsToMenuImages(images: MenuPayload["images"]): {
  processedImages: Menu["images"];
  unUploadedImages: UploadFile<CloudinaryResponse | undefined>[];
} {
  const unUploadedImages: UploadFile<CloudinaryResponse | undefined>[] = [];
  /**
   * check first images present or not
   * if not present return empty array
   */
  if (!images?.length) return { processedImages: [], unUploadedImages: images };

  /**
   * map through the images and convert them into MenuImage format
   * if response is not present then return empty array
   */

  const processedImages = images.flatMap((image) => {
    if (!image) return [];
    const uploaded = image.response;
    if (!uploaded || image.status === "error") {
      console.error("Cloudinary response:", uploaded);
      unUploadedImages.push(image);
      return [];
    }
    return [
      {
        uid: image.uid,
        url: uploaded.secure_url,
        name: uploaded.display_name,
      },
    ];
  });
  return {
    processedImages,
    unUploadedImages,
  };
}

// Function overloads for type safety
function processMenuFormPayload({
  menuPayload,
  isEdit,
  currentMenu,
  ingredients,
  categories,
}: {
  menuPayload: MenuPayload;
  isEdit: true;
  currentMenu: Menu;
  ingredients?: Ingredient[];
  categories?: Category[];
}): Menu;
function processMenuFormPayload({
  menuPayload,
  isEdit,
  currentMenu,
  ingredients,
  categories,
}: {
  menuPayload: MenuPayload;
  isEdit?: false;
  currentMenu?: Menu;
  ingredients?: Ingredient[];
  categories?: Category[];
}): Omit<Menu, "id">;
function processMenuFormPayload({
  menuPayload,
  isEdit,
  currentMenu,
  ingredients,
  categories,
}: {
  menuPayload: MenuPayload;
  isEdit?: boolean;
  currentMenu?: Menu;
  ingredients?: Ingredient[];
  categories?: Category[];
}): Menu | Omit<Menu, "id"> {
  const categoriesValues = categories?.filter((category) => menuPayload.category.includes(category.id)) || [];
  const ingredientsValues = ingredients?.filter((ingredient) => menuPayload.ingredients.includes(ingredient.id)) || [];
  // if image object present status it means they are newly uploaded images
  const newlyUploadedImages = menuPayload.images.filter((image) => Boolean(image?.status)) || [];
  const { processedImages, unUploadedImages } = transformCloudinaryImageUploadsToMenuImages(newlyUploadedImages || []);

  if (isEdit && currentMenu) {
    if (!newlyUploadedImages?.length && !currentMenu?.images?.length) {
      throw new Error("At least one image is required.");
    }
    /**
     * in Edit Mode
     * default current Menu,
     * then override with menuPayload
     * then update category, ingredients and images
     */
    return {
      ...currentMenu,
      ...menuPayload,
      category: categoriesValues,
      ingredients: ingredientsValues,
      images: newlyUploadedImages?.length ? processedImages : currentMenu.images,
    };
  }

  // condition is like single image should be present else we are throwing error here
  if (unUploadedImages.length) {
    throw new Error("Image upload failed. Please try again.");
  }

  /**
   * in Add mode
   * default menuPayload
   * then update category, ingredients and images
   */
  return {
    ...menuPayload,
    category: categoriesValues,
    ingredients: ingredientsValues,
    images: processedImages,
  };
}

export { processMenuFormPayload };
