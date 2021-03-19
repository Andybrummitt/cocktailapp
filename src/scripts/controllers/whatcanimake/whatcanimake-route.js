import { addContentToRootDiv, fetchCocktail, addNoResultsText, addLoading, removeLoading, filterDrinksByInput, clearField, fullyParseIngredient, isIngredient, getIngredientsListElFromArticle } from "../util-functions";
import { makeCocktailTemplate } from '../controller-util-functions/cocktailtemplate.js';
import { outputIngredients } from '../../views/views-util-functions/outputIngredients.js';
import { makeCocktailObj } from '../controller-util-functions/makeCocktailObj.js';
import { getAllDrinks } from '../../model/getAllDrinks.js';
import { displayIngredientOnDOM, createRemoveIngredientBtn, removeIngredientFromDOM } from './ingredients-display-functions.js';
import { ingredientsState, addToState, removeFromState } from './ingredients-state.js';
import { getIngredientsList, calculateAmountOfIngredientsOff, makeObjCocktailsByNumberOfIngredientsOff, getCocktailsWithUsersIngredients } from './get-cocktails-functions.js';


const getIngredientString = (ingredient) => {
    const colonIndex = ingredient.textContent.indexOf(':');
    return ingredient.textContent.slice(0, colonIndex).toLowerCase();
};

const colorMissingIngredientsRed = (ingredientListItems, UsersOwnIngredients, getIngredientString) => {
    for(let ingredientListItem of ingredientListItems){
        const ingredientString = getIngredientString(ingredientListItem);
    if(!UsersOwnIngredients.includes(ingredientString)){
        ingredientListItem.classList.add('missing-ingredient');
        };
    };       
};

const addButtonListener = (button, inputValue) => {
    button.addEventListener('click', e => {
        removeIngredientFromDOM(e, inputValue);
        removeFromState(inputValue);
    });
};

const appendDrinksWithNMissingIngredientsHeading = (section, amountOff) => {
    const h3 = document.createElement('h3');
    h3.textContent = `Cocktails which you are missing ${amountOff} ingredient${amountOff > 1 ? 's' : ''} for`;
    h3.classList.add('missing-n-ingredients-heading')
    section.append(h3);
};

//  DISPLAY FUNCTIONS
const displayCocktails = (cocktailsByNumberOfIngredientsOff, section, UsersOwnIngredients) => {
    if(cocktailsByNumberOfIngredientsOff[0].length < 1){
        const noCocktailsHTML = `<p class="error-message missing-ingredients-title">Sorry it doesn't seem like you have <b>all</b> the ingredients for any cocktails</p>`
        section.innerHTML = noCocktailsHTML;
    }
    //  LOOP THROUGH COCKTAILS TO FIND 10 COCKTAILS THAT USER HAS MOST INGREDIENTS FOR
    let counter = 0;
    for(let amountOff in cocktailsByNumberOfIngredientsOff){
        if(amountOff > 0 && counter < 10){
            appendDrinksWithNMissingIngredientsHeading(section, amountOff);
        };
        for(let cocktail of cocktailsByNumberOfIngredientsOff[amountOff]){
            if(counter < 10){
                //  OUTPUT HTML 
                const article = document.createElement('article');
                const cocktailObj = makeCocktailObj(cocktail);
                article.innerHTML = makeCocktailTemplate(cocktailObj);
                //  OUTPUT INGREDIENTS LIST HTML
                const { ingredientsList } = cocktailObj;
                const ingredientsEl = getIngredientsListElFromArticle(article);
                outputIngredients(ingredientsEl, ingredientsList);
                section.append(article);
                //  COLOR MISSING INGREDIENTS RED
                const ingredientListItems = Array.from(ingredientsEl.children);
                colorMissingIngredientsRed(ingredientListItems, UsersOwnIngredients, getIngredientString)
                counter++;
            }    
            else return;
        };
    };
};

const handleSubmit = async state => {
    const section = document.querySelector('.search-results');
    //  IF ANY INGREDIENTS INPUTTED
    if(state.length > 0){
        const parsedState = state.map(elem => fullyParseIngredient(elem));
        addLoading(section);
        const allDrinks = await getAllDrinks();
        //  INIT OBJ WHICH TRACKS WHICH COCKTAILS USER HAS ALL INGREDIENTS FOR / IS CLOSE TO HAVING ALL INGREDIENTS FOR
        const cocktailsByNumberOfIngredientsOff = makeObjCocktailsByNumberOfIngredientsOff();
        //  GET COCKTAILS THAT USE INGREDIENTS USER HAS AND LOOP OVER 
        const filteredCocktails = getCocktailsWithUsersIngredients(parsedState, filterDrinksByInput, allDrinks);
        for(let cocktail of filteredCocktails){
            const ingredientsList = getIngredientsList(cocktail);
            const amountOfIngredientsOff = calculateAmountOfIngredientsOff(ingredientsList, parsedState);
            //  ADD TO COCKTAIL OBJ UNDER THE AMOUNT OF INGREDIENTS OFF BY PROPERTY
            cocktailsByNumberOfIngredientsOff[`${amountOfIngredientsOff}`].push(cocktail);
        };
        //  REMOVE LOADING ANIMATION AND DISPLAY COCKTAILS TO USER
        removeLoading(section);
        displayCocktails(cocktailsByNumberOfIngredientsOff, section, state) 
    }
    else section.innerHTML = '<p class="error-message">Please input your ingredients and try again</p>';  
};

const addSubmitListener = (ingredientsState) => {
    const submitBtn = document.querySelector('#whatcanimake-btn');
    submitBtn.addEventListener('click', () => handleSubmit(ingredientsState))
};

const ingredientAlreadyAddedMessage = (form) => {
    const p = document.createElement('p');
    p.textContent = 'You have already added that ingredient!';
    p.style.textAlign = 'center';
    form.append(p);
    setTimeout(() => p.remove(), 3000);
};

//validating form input
//displaying ingredient
//changing state

const addDisplayIngredientsListenerToForm = (form, inputField, ul) => {
    form.addEventListener('submit', function(ev){
        ev.preventDefault();
        const inputValue = inputField.value;
        //  FORM VALIDATION
        if(inputValue && !ingredientsState.includes(inputValue)){
            const button = createRemoveIngredientBtn();
            displayIngredientOnDOM(inputValue, ul, button);
            addButtonListener(button, inputValue);
            addToState(inputValue);
            clearField(inputField);  
        }
        else if(inputValue && ingredientsState.includes(inputValue)){
            ingredientAlreadyAddedMessage(form);
            clearField(inputField);
        };
    });
};

export const whatCanIMake = () => {
    const content = `
    <div id="whatcanimake-div">
        <p>Add your ingredients below</p>
        <form action="/" id="ingredients-form">
            <input name="ingredient-input" placeholder="Add Ingredient" id="ingredient-input">
            <button type="submit">Add Ingredient</button>
        </form>
        <ul class="your-ingredients"></ul>
        <button id="whatcanimake-btn">What Can I Make?</button>
    </div>
    <section class="search-results"></section>
    `;

    addContentToRootDiv(content);
    const inputField = document.querySelector('#ingredient-input');
    const ul = document.querySelector('.your-ingredients');
    const ingredientsForm = document.querySelector('#ingredients-form');
    addSubmitListener(ingredientsState);
    addDisplayIngredientsListenerToForm(ingredientsForm, inputField, ul);
};

//generating input field
//getting users input
//calculating cocktails that match
//generating output