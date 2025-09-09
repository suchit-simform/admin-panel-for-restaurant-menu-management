import { useEffect } from "react";
import { useAppDispatch } from "src/store";
import { ingredientApi } from "src/store/ingredient/ingredient.api";
import { setIngredients } from "src/store/ingredient/ingredient.slice";

const useIngredients = () => {
  const dispatch = useAppDispatch();
  const { data: ingredients, isLoading: isPendingIngredients } = ingredientApi.useGetIngredientItemsQuery();

  useEffect(() => {
    if (isPendingIngredients || !ingredients) {
      return;
    }
    // dispatch ingredients to store
    dispatch(setIngredients(ingredients));
  }, [ingredients, dispatch, isPendingIngredients]);

  return {
    ingredients,
    isPendingIngredients,
  };
};

export default useIngredients;
