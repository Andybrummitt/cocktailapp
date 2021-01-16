import { addToRootDiv, fetchCocktail, addLoading, removeLoading, filterDrinksByInput, addNoResultsText, clearField } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'
import { searchByType } from "../searchByType";

const getResults = async (input, section) => {
    //  GET COCKTAILS
    const fetchedJson = await fetchCocktail(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`);
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
        const articleChildren = Array.from(article.firstElementChild.children);
        const ingredientsEl = articleChildren.filter(child => child.classList.contains('ingredients-list'))[0];
        outputIngredients(ingredientsEl, cocktailObj.ingredientsList);
    };
};

export const searchByName = () => searchByType('name', getResults);

