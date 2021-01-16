import { getTitle, isAlcoholic, getImage, getInstructions, getIngredients } from './util-functions.js';

export const makeCocktailObj = (cocktail) => {
    return {
        img: getImage(cocktail),
        ingredientsList: getIngredients(cocktail),
        title: getTitle(cocktail),
        alcoholicFlag: isAlcoholic(cocktail),
        instructions: getInstructions(cocktail)
    };   
};