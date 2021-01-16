import { fetchCocktail } from './util-functions.js';

const getDrinksByLetter = async (letter) => {
    const fetchedJson = await fetchCocktail(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);
    const drinks = fetchedJson.drinks;
    return drinks;
}
//  this takes a while try to optimize
export const getAllDrinks = async () => {
    let allDrinks = [];
    const alphabet ='abcdefghijklmnopqrstuvwxyz';
    for(let letter of alphabet){
       const drinksByLetterArr = await getDrinksByLetter(letter);
       drinksByLetterArr && allDrinks.push(drinksByLetterArr);
    };
    return allDrinks.flat();
};
