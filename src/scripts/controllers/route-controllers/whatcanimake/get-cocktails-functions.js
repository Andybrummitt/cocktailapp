import { isIngredient } from "../../util-functions";

export const getIngredientsList = cocktail => {
    let ingredientsList = [];
    for(let cocktailKeyValuePair of Object.entries(cocktail)){
        if(isIngredient(cocktailKeyValuePair)){
            const ingredient = cocktailKeyValuePair[1];
            ingredient && ingredientsList.push(ingredient);
        };
    };
    return ingredientsList;
 };
 
export const calculateAmountOfIngredientsOff = (ingredientsList, parsedState) => {
    const matchedIngredients = ingredientsList.filter(ingredient => parsedState.includes(ingredient));
    const amountOfIngredientsOff = ingredientsList.length - matchedIngredients.length;
    return amountOfIngredientsOff;
};

export const makeObjCocktailsByNumberOfIngredientsMissing = () => {
    const MAX_INGREDIENTS_IN_API = 15;
    let obj = {};
    for(let i = 0; i < MAX_INGREDIENTS_IN_API; i++){
        obj[`${i}`] = [];
    };
    return obj;
};

export const getCocktailsWithUsersIngredients = (usersInputIngredients, filterDrinksByInputFunc, allDrinks) => {
    const cocktailsByIngredients = {};
    for(let ingredient of usersInputIngredients){
        cocktailsByIngredients[`${ingredient}`] = filterDrinksByInputFunc(ingredient, allDrinks);
    };
    const filteredCocktailsSet = new Set(Object.values(cocktailsByIngredients).flat());
    return Array.from(filteredCocktailsSet);    
};