import { useEffect } from "react";
import { useAppDispatch } from "src/store";
import { categoryApi } from "src/store/category/category.api";
import { setCategories } from "src/store/category/category.slice";

const useCategories = () => {
  const dispatch = useAppDispatch();
  const { data: categories, isLoading: isPendingCategories } = categoryApi.useGetCategoryItemsQuery();

  useEffect(() => {
    if (isPendingCategories || !categories) {
      return;
    }
    // dispatch categories to store
    dispatch(setCategories(categories));
  }, [categories, dispatch, isPendingCategories]);

  return {
    categories,
    isPendingCategories,
  };
};

export default useCategories;
