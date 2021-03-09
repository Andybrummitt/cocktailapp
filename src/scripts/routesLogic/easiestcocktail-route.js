import { isIngredient } from '../util-functions.js';
import { addToRootDiv, addLoading, removeLoading, getIngredientsListElFromArticle } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'
import { getAllDrinks } from '../getAllDrinks.js';

const content = `<h1 class="title-dark">Easiest Cocktails</h1>
<section class="search-results"></section>`;

const drinkPropertyIngredientIsPresent = objEntry => isIngredient(objEntry) && objEntry[1] !== null;
const drinkPropertyIngredientIsNotPresent = objEntry => isIngredient(objEntry) && objEntry[1] === null;

const getDrinksWithLessThan3Ingredients = (allDrinks) => {
    const drinksWithLessThan3Ingredients = [];
    for(let drink of allDrinks){
        let ingredientsCounter = 0; 
        //  LOOP OVER EACH DRINKS PROPERTIES
        for(let drinkProperty of Object.entries(drink)){
            //  IF PROPERTY IS A DRINK'S INGREDIENT PROPERTY AND INGREDIENT IS PRESENT
            if(drinkPropertyIngredientIsPresent(drinkProperty)){
                ingredientsCounter++;
            }
            //  IF MORE THAN 3 INGREDIENTS - BREAK OUT OF DRINK'S PROPERTIES LOOP
            if(ingredientsCounter > 2){
                ingredientsCounter = 0;
                break;
            };
            //  IF PROPERTY IS A DRINK'S INGREDIENT PROPERTY AND INGREDIENT ISN'T PRESENT
            if(drinkPropertyIngredientIsNotPresent(drinkProperty)){
                drinksWithLessThan3Ingredients.push(drink);
                ingredientsCounter = 0;
                break;
            };          
        };
    };
    return drinksWithLessThan3Ingredients;
};

export const easiestCocktails = async () => {
    addToRootDiv(content);
    const section = document.querySelector('.search-results');
    console.log(section)
    addLoading(section);
    const allDrinks = await getAllDrinks();
    const drinksWithLessThan3Ingredients = getDrinksWithLessThan3Ingredients(allDrinks);
    removeLoading(section);
    for(let cocktail of drinksWithLessThan3Ingredients){
        const cocktailObj = makeCocktailObj(cocktail);
        const cocktailHTML = makeCocktailTemplate(cocktailObj);
        const article = document.createElement('article');
        article.innerHTML = cocktailHTML;
        section.append(article);
        //  ADD INGREDIENTS HTML
        const ingredientsEl = getIngredientsListElFromArticle(article);
        outputIngredients(ingredientsEl, cocktailObj.ingredientsList);
    };
};

