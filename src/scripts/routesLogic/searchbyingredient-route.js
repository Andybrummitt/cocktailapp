import { addContentToRootDiv, fetchCocktail, addNoResultsText, addLoading, removeLoading, filterDrinksByInput, clearField, fullyParseIngredient, getIngredientsListElFromArticle } from "../controllers/util-functions";
import { makeCocktailTemplate } from '../controllers/controller-util-functions/cocktailtemplate.js';
import { outputIngredients } from '../views/views-util-functions/outputIngredients.js';
import { makeCocktailObj } from '../controllers/controller-util-functions/makeCocktailObj.js'
import { getAllDrinks } from '../model/getAllDrinks.js';
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
    const parsedInput = fullyParseIngredient(input);
    //  FILTER DRINKS BASED ON INPUT INGREDIENTS
    const filteredDrinks = filterDrinksByInput(parsedInput, allDrinks);
     //  CLEAR INPUT
    const searchField = document.querySelector('#search-input');
    clearField(searchField);
    if(filteredDrinks.length < 1){
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
        const ingredientsEl = getIngredientsListElFromArticle(article);
        outputIngredients(ingredientsEl, cocktailObj.ingredientsList);
    };
};

export const searchByIngredient = () => searchByType('ingredient', getResults);