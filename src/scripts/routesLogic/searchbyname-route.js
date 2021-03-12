import { addContentToRootDiv, fetchCocktail, addLoading, removeLoading, filterDrinksByInput, addNoResultsText, clearField, getIngredientsListElFromArticle } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'
import { searchByType } from "../searchByType";

const isError = fetchedData => fetchedData instanceof Error;
const displayErrorMsg = (fetchedData, section) => {
    console.log(fetchedData)
    section.innerHTML = `<p>Sorry, there appears to be an error with the request - ${fetchedData.status}`
}; 

const getResults = async (input, section) => {
    //  GET COCKTAILS
    const fetchedJson = await fetchCocktail(`https://www.thecocktaildb.com/api/json/v1/2/search.php?s=${input}`);
    if(isError(fetchedJson)){
        displayErrorMsg(fetchedJson, section);
        return;
    }
    const cocktails = fetchedJson.drinks;
    //  CLEAR INPUT
    const searchField = document.querySelector('#search-input');
    clearField(searchField);
    if(!cocktails){
        addNoResultsText(section);
        return;
    }
    section.innerHTML = '';
    //  ADD HTML TEMPLATES 
    for(let cocktail of cocktails){
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

export const searchByName = () => searchByType('name', getResults);

