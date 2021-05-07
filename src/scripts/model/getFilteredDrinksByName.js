import { fetchCocktailAndSetState } from "../controllers/util-functions";
import { cocktailsState } from "./state";

export const getFilteredDrinksByName = async (name) => {
        await fetchCocktailAndSetState(`/searchbyname/search/${name}`, cocktailsState.filteredDrinksByName);
};
