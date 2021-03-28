import { isIngredient } from './util-functions.js';
import { cocktailsState } from '../model/state.js';
import { getAllDrinks } from '../model/getAllDrinks.js';
import EasiestCocktailsView from '../views/view-easiestCocktails.js';

const drinkObjPropertyIngredientIsPresent = objEntry => isIngredient(objEntry) && objEntry[1] !== null;

const getDrinksWithLessThan3Ingredients = allDrinks => {
        const drinksWithLessThan3Ingredients = allDrinks.filter(drinkObj => {
            let amountOfIngredients = 0;
            Object.entries(drinkObj).forEach(prop => {
                if(drinkObjPropertyIngredientIsPresent(prop)){
                    amountOfIngredients++;
                }; 
            });
            return amountOfIngredients < 3;
        });    
    return drinksWithLessThan3Ingredients; 
};

export const easiestCocktails = async () => {
    EasiestCocktailsView.generateInitialMarkUp();
    //  SAVE TIME IF ALLDRINKS ALREADY STORED IN STATE
    if(cocktailsState.allDrinks.success === null) {
        await getAllDrinks();
    }
    const { success: allDrinks, error } = cocktailsState.allDrinks;
    if(error){
        EasiestCocktailsView.removeLoading(EasiestCocktailsView.section)
        EasiestCocktailsView.generateErrorPage(error, EasiestCocktailsView.error);
    }
    else {
        const drinksWithLessThan3Ingredients = getDrinksWithLessThan3Ingredients(allDrinks);
        EasiestCocktailsView.generateFinalMarkUp(drinksWithLessThan3Ingredients);
    }
};


