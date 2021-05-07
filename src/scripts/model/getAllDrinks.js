import { fetchCocktailAndSetState } from '../controllers/util-functions.js';
import { cocktailsState } from './state.js';

export const getAllDrinks = async () => {
    await fetchCocktailAndSetState('/whatcanimake/search', cocktailsState.allDrinks);
};
