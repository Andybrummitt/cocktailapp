import { fetchCocktail } from '../controllers/util-functions.js';
import { cocktailsState } from './state.js';

const getDrinksByLetter = async (letter) => {
    let fetchedJson;
    try {
        fetchedJson = await fetchCocktail(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    }
    catch(err){
        cocktailsState.allDrinks.error = err;
        cocktailsState.allDrinks.success = null;
        return;
    }
    const drinks = fetchedJson.drinks;
    return drinks;
}

export const getAllDrinks = async () => {
    let allDrinks = [];
    const alphabet ='abcdefghijklmnopqrstuvwxyz';
    for(let letter of alphabet){
        const drinksByLetterArr = await getDrinksByLetter(letter);
        drinksByLetterArr && allDrinks.push(drinksByLetterArr);
    };
    cocktailsState.allDrinks.success = allDrinks.flat();
    cocktailsState.allDrinks.error = null;
};
