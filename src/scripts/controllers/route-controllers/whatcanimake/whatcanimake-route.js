import { getAllDrinks } from '../../../model/getAllDrinks.js';
import { cocktailsState } from "../../../model/state";
import WhatCanIMakeView from '../../../views/whatcanimake/view-whatCanIMake.js';
import { filterDrinksByInput, fullyParseIngredient } from "../../util-functions";
import { calculateAmountOfIngredientsOff, getCocktailsWithUsersIngredients, getIngredientsList, makeObjCocktailsByNumberOfIngredientsMissing } from './get-cocktails-functions.js';
import { handleIngredientInputOnSubmit } from "./ingredientListLogic";
import ingredientsState from './ingredients-state.js';

const displayCocktails = (cocktailsByNumberOfIngredientsMissing, usersOwnIngredients) => {
    const cocktailsWithNoIngredientsMissing = cocktailsByNumberOfIngredientsMissing[0];
    if(cocktailsWithNoIngredientsMissing.length < 1){
        WhatCanIMakeView.generateNoCocktailsMessage();
    }
        WhatCanIMakeView.generateFinalMarkUp(cocktailsByNumberOfIngredientsMissing, usersOwnIngredients);
};

const storeGeneratedCocktailsByNumberOfIngredientsUserIsMissing = (filteredCocktails, parsedIngredients) => {
    const cocktailsByNumberOfIngredientsMissing = makeObjCocktailsByNumberOfIngredientsMissing();
    for(let cocktail of filteredCocktails){
        const ingredientsList = getIngredientsList(cocktail);
        const amountOfIngredientsOff = calculateAmountOfIngredientsOff(ingredientsList, parsedIngredients);
        cocktailsByNumberOfIngredientsMissing[`${amountOfIngredientsOff}`].push(cocktail);
    };
    return cocktailsByNumberOfIngredientsMissing;
};

const handleSubmit = async ingredients => {
    if(ingredients.length > 0){
        const parsedIngredients = ingredients.map(ingredient => fullyParseIngredient(ingredient));
        WhatCanIMakeView.addLoading();
        if(cocktailsState.allDrinks.success === null) {
            await getAllDrinks();
        }
        const { success: allDrinks, error } = cocktailsState.allDrinks;
        if(error){
            WhatCanIMakeView.removeLoading();
            WhatCanIMakeView.generateErrorPage(error);
        }
        else {
        const filteredCocktails = getCocktailsWithUsersIngredients(parsedIngredients, filterDrinksByInput, allDrinks);
        const cocktailsByNumberOfIngredientsMissing = storeGeneratedCocktailsByNumberOfIngredientsUserIsMissing(filteredCocktails, parsedIngredients);
        //  REMOVE LOADING ANIMATION AND DISPLAY COCKTAILS TO USER
        const ingredientList = parsedIngredients.map(ingredient => ingredient.toLowerCase());
        displayCocktails(cocktailsByNumberOfIngredientsMissing, ingredientList) 
        }
    }
    else WhatCanIMakeView.generateNoIngredientsError();
};

const getDomElements = () => {
    return {
        inputField: document.querySelector('#ingredient-input'),
        ul: document.querySelector('.your-ingredients'),
        ingredientsForm: document.querySelector('#ingredients-form'),
        submitBtn: document.querySelector('#whatcanimake-btn')
    };
};

export const whatCanIMake = () => {
    WhatCanIMakeView.generateInitialMarkUp();
    const domElements = getDomElements();
    domElements.ingredientsForm.addEventListener('submit', (ev) => handleIngredientInputOnSubmit(domElements, ev));
    domElements.submitBtn.addEventListener('click', () => handleSubmit(ingredientsState.ingredients));
};
