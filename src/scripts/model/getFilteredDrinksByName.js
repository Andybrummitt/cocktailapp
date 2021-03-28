import { fetchCocktail } from "../controllers/util-functions";
import { cocktailsState } from "./state";

export const getFilteredDrinksByName = async (name) => {
    try {
        const fetchedJson = await fetchCocktail(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        const cocktails = fetchedJson.drinks;
        cocktailsState.filteredDrinksByName.success = cocktails;
        cocktailsState.filteredDrinksByName.error = null;
    }
    catch(err){
        cocktailsState.filteredDrinksByName.error = err;
        cocktailsState.filteredDrinksByName.success = null;
    };
};
