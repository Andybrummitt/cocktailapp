import { addToRootDiv, fetchCocktail, compose, getContainerChildren, getImgEl, getInstructionsEl, getListEl, getTitleEl, addToPage, getIsAlcoholicEl, addImgToPage } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'

export const randomCocktail = async () => {
    
    const fetchedJson = await fetchCocktail('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = fetchedJson.drinks[0];
    const cocktailObj = makeCocktailObj(cocktail);
    const { ingredientsList } = cocktailObj;
    const cocktailTemplate = makeCocktailTemplate(cocktailObj);

    const content = `
        <button class="randomise">Randomise Again!</button>
        ${cocktailTemplate}
        `
    addToRootDiv(content)

    const randomiseBtn = document.querySelector('.randomise');
    const ingredientsEl = document.querySelector('.ingredients-list');

    outputIngredients(ingredientsEl, ingredientsList);

    randomiseBtn.addEventListener('click', randomCocktail);

    // const imgEl = compose(getContainerChildren('random-cocktail'), getImgEl);
    // const instructionsEl = compose(getContainerChildren('random-cocktail'), getInstructionsEl);
    
    // const titleEl = compose(getContainerChildren('random-cocktail'), getTitleEl);
    // const alcoholicFlagEl = compose(getContainerChildren('random-cocktail'), getIsAlcoholicEl);

    // addImgToPage(cocktailObj.img, imgEl);
    // addToPage(cocktailObj.title, titleEl);
    // console.log(titleEl.textContent)
    // addToPage(cocktailObj.instructions, instructionsEl);
    // addToPage(cocktailObj.alcoholicFlag, alcoholicFlagEl);
    
}


