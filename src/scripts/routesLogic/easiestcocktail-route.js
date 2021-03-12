import { isIngredient } from '../util-functions.js';
import { addContentToRootDiv, addLoading, removeLoading, getIngredientsListElFromArticle } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'
import { getAllDrinks } from '../getAllDrinks.js';

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

const displayCocktails = (cocktails, section) => {
    for(let cocktail of cocktails){
        const cocktailObj = makeCocktailObj(cocktail);
        const cocktailHTML = makeCocktailTemplate(cocktailObj);
        const article = document.createElement('article');
        article.innerHTML = cocktailHTML;
        section.append(article);
        const ingredientsEl = getIngredientsListElFromArticle(article);
        outputIngredients(ingredientsEl, cocktailObj.ingredientsList);
    };
};

const content = `<h1 class="title-dark">Easiest Cocktails</h1>
<section class="search-results"></section>`;

export const easiestCocktails = async () => {
    addContentToRootDiv(content);
    const section = document.querySelector('.search-results');
    addLoading(section);
    const allDrinks = await getAllDrinks();
    const drinksWithLessThan3Ingredients = getDrinksWithLessThan3Ingredients(allDrinks);
    removeLoading(section);
    displayCocktails(drinksWithLessThan3Ingredients, section);
};

