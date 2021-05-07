import { fetchCocktailAndSetState } from '../controllers/util-functions.js';
import { cocktailsState } from './state.js';

export const getRandomCocktail = async () => {
    await fetchCocktailAndSetState('/randomcocktail/getcocktail', cocktailsState.randomCocktail);
}