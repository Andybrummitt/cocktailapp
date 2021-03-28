import { fetchCocktail } from '../controllers/util-functions.js';
import { cocktailsState } from './state.js';

export const getRandomCocktail = async () => {
    try {
        const fetchedJson = await fetchCocktail('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const cocktail = fetchedJson.drinks[0];
        cocktailsState.randomCocktail.success = cocktail; 
        cocktailsState.randomCocktail.error = null;   
    }
    catch(err){
        cocktailsState.randomCocktail.error = err; 
        cocktailsState.randomCocktail.success = null;      
    }
};