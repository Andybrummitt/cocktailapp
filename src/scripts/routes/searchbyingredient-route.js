import { addToRootDiv, fetchCocktail, addNoResultsText, addLoading, removeLoading, filterDrinksByInput, clearField } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'
import { getAllDrinks } from '../getAllDrinks.js';
import { searchByType } from "../searchByType";

const getResults = async (input, section) => {
    //  PUT LOADING GRAPHIC HERE
    addLoading(section);
    var t0 = performance.now()

    const allDrinks = await getAllDrinks();  // <---- The function you're measuring time for 

    var t1 = performance.now()
    console.log("Call to getAllDrinks took " + (t1 - t0) + " milliseconds.")
    removeLoading(section);
    //  UPPERCASE FIRST LETTER OF INPUT
    const parsedInput = input.charAt(0).toUpperCase() + input.slice(1);
    //  FILTER DRINKS BASED ON INPUT INGREDIENTS
    const filteredDrinks = filterDrinksByInput(parsedInput, allDrinks);
     //  CLEAR INPUT
     const searchField = document.querySelector('#search-input');
     clearField(searchField);
    if(!filteredDrinks){
        addNoResultsText(section);
    }
    //  ADD HTML TEMPLATES 
    for(let cocktail of filteredDrinks){
        const cocktailObj = makeCocktailObj(cocktail);
        const cocktailHTML = makeCocktailTemplate(cocktailObj);
        const article = document.createElement('article');
        article.innerHTML = cocktailHTML;
        section.append(article);
        //  ADD INGREDIENTS HTML
        const articleChildren = Array.from(article.firstElementChild.children);
        const ingredientsEl = articleChildren.filter(child => child.classList.contains('ingredients-list'))[0];
        outputIngredients(ingredientsEl, cocktailObj.ingredientsList);
    };
};

export const searchByIngredient = () => searchByType('ingredient', getResults);