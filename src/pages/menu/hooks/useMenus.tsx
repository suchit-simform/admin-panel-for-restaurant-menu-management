import { useEffect } from "react";
import { useAppDispatch } from "src/store";
import { menuApi } from "src/store/menu/menu.api";
import { setMenus } from "src/store/menu/menu.slice";

const useMenus = () => {
  const dispatch = useAppDispatch();
  const { data: menus, isLoading: isPendingMenus } = menuApi.useGetMenuItemsQuery();

  useEffect(() => {
    if (isPendingMenus || !menus) {
      return;
    }
    // dispatch menus to store
    dispatch(setMenus(menus));
  }, [menus, dispatch, isPendingMenus]);

  return {
    menus,
    isPendingMenus,
  };
};

export default useMenus;
