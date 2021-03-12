import { addContentToRootDiv, fetchCocktail } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'; 

export const randomCocktail = async () => {
    
    const fetchedJson = await fetchCocktail('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = fetchedJson.drinks[0];
    const cocktailObj = makeCocktailObj(cocktail);
    const { ingredientsList } = cocktailObj;
    const cocktailTemplate = makeCocktailTemplate(cocktailObj);

    const content = `<button class="randomise">Randomise Again!</button>${cocktailTemplate}`;
    addContentToRootDiv(content);

    const randomiseBtn = document.querySelector('.randomise');
    const ingredientsEl = document.querySelector('.ingredients-list');

    outputIngredients(ingredientsEl, ingredientsList);

    randomiseBtn.addEventListener('click', randomCocktail);  
};


