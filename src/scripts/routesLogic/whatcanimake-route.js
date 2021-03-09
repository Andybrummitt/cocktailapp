import { addToRootDiv, fetchCocktail, addNoResultsText, addLoading, removeLoading, filterDrinksByInput, clearField, fullyParseIngredient, isIngredient, getIngredientsListElFromArticle } from "../util-functions";
import { makeCocktailTemplate } from '../cocktailtemplate.js';
import { outputIngredients } from '../outputIngredients.js';
import { makeCocktailObj } from '../makeCocktailObj.js'
import { getAllDrinks } from '../getAllDrinks.js';

export const getIngredientsList = cocktail => {
    let ingredientsList = [];
    for(let entry of Object.entries(cocktail)){
        if(isIngredient(entry)){
            entry[1] && ingredientsList.push(entry[1]);
        };
    };
    return ingredientsList;
 };
 const calculateAmountOfIngredientsOff = (ingredientsList, parsedState) => {
    let counter = 0;
    ingredientsList.forEach(ingredient => {
        if(parsedState.includes(ingredient)){
            counter++;
        };
    });
    return ingredientsList.length - counter;
};
const makeObjCocktailsByNumberOfIngredientsOff = () => {
    let obj = {};
    for(let i = 0; i < 15; i++){
        obj[`${i}`] = [];
    };
    return obj;
};

const getCocktailsByEachIngredient = (ingredientsInputState, filterDrinksByInputFunc, allDrinks) => {
    const cocktailsByIngredients = {}
    for(let ingredient of ingredientsInputState){
        cocktailsByIngredients[`${ingredient}`] = filterDrinksByInputFunc(ingredient, allDrinks);
    };
    return cocktailsByIngredients;
}
const getCocktailsThatMatchUserIngredients = (ingredientsInputState, filterDrinksByInput, allDrinks) => {
        //  GET COCKTAILS BY EACH INGREDIENT FROM API
        const cocktailsByIngredients = getCocktailsByEachIngredient(ingredientsInputState, filterDrinksByInput, allDrinks);
        //  CONCAT OBJ ARRAYS TOGETHER INTO BIG ARRAY WITH ONLY UNIQUE VALUES
        const filteredCocktailsSet = new Set(Object.values(cocktailsByIngredients).map(arr => arr).flat());
        const filteredCocktails = Array.from(filteredCocktailsSet);
        return filteredCocktails;
};

const colorMissingIngredientsRed = (ingredientListItems, UsersOwnIngredients) => {
    //  LOOP THROUGH INGREDIENTS LIST DISPLAYED
    for(let ingredientListItem of ingredientListItems){
        //  GET INGREDIENT STRING
        const colonIndex = ingredientListItem.textContent.indexOf(':');
        const ingredientWithoutMeasurement = ingredientListItem.textContent.slice(0, colonIndex).toLowerCase();
        //  IF USER DOESN'T HAVE INGREDIENT FOR COCKTAIL - COLOR INGREDIENT RED
    if(!UsersOwnIngredients.includes(ingredientWithoutMeasurement)){
        ingredientListItem.classList.add('missing-ingredient');
        };
    };       
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
        const noCocktailsHTML = `
        <p class="error-message missing-ingredients-title">Sorry it doesn't seem like you have <b>all</b> the ingredients for any cocktails</p>`
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
                colorMissingIngredientsRed(ingredientListItems, UsersOwnIngredients)
                counter++;
            }    
            else return;
        };
    };
};

let ingredientsState = [];

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
        const filteredCocktails = getCocktailsThatMatchUserIngredients(parsedState, filterDrinksByInput, allDrinks);
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

const addToState = ingredient => ingredientsState.push(ingredient);
const removeFromState = ingredient => {
    ingredientsState.splice(ingredientsState.indexOf(ingredient), 1);
};

const removeIngredient = (ev, inputValue) => {
    const liToRemove = ev.target.parentElement.parentElement;
    liToRemove.remove();
    removeFromState(inputValue);
};

const addIngredientToList = (inputValue, ul) => {
    //  CREATE ELEMENTS
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = inputValue;
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.classList.add('remove-ingredient-btn');
    //  APPEND TO HTML
    div.append(span);
    div.append(button);
    li.append(div);
    ul.append(li);
    addToState(inputValue);
    button.addEventListener('click', e => removeIngredient(e, inputValue));
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

    addToRootDiv(content);
    const inputField = document.querySelector('#ingredient-input');
    const ul = document.querySelector('.your-ingredients');
    const form = document.querySelector('#ingredients-form');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const inputValue = inputField.value;
        //  FORM VALIDATION
        if(inputValue && !ingredientsState.includes(inputValue)){
            addIngredientToList(inputValue, ul);
            clearField(inputField);  
        }
        else if(inputValue && ingredientsState.includes(inputValue)){
            ingredientAlreadyAddedMessage(form);
            clearField(inputField);
        }
    });
    addSubmitListener(ingredientsState);
};


// 'Add your ingredients below' message
// input box - adds input value to list that appends to section
// remove buttons on list to remove
// what can i make with these ingredients button 

// function fires onclick of button
// filter alldrinks by which have ingredients, discard those without ingredients
