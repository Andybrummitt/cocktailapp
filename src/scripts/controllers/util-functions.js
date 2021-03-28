import { domObj } from '../domObj';
const { rootDiv, cocktailTitles, cocktailImgs, cocktailIngredients, cocktailInstructions } = domObj;

const addContentToRootDiv = content => rootDiv.innerHTML = content;
const getEl = id => document.querySelector(`#${id}`);

const fetchCocktail = async (url) => {
    try {
        let response = await fetch(url);
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
        else if(response.status === 404){
                throw new Error('404 Not Found');
                };       
        } 
    catch(err){
        throw err;
    } 
}

//  GET VALUES FROM API

const isIngredient = entry => entry[0].slice(0, 13) === 'strIngredient';
const getTitle = cocktail =>  cocktail[`strDrink`];
const isAlcoholic = cocktail => cocktail[`strAlcoholic`] === 'Alcoholic' ? 'Alcoholic' : 'Non-alcoholic';
const getImage = cocktail => cocktail[`strDrinkThumb`];
const getInstructions = cocktail => cocktail[`strInstructions`];

const getIngredients = cocktail => {
    const ingredientsObj = {};
    const cocktailEntries = Object.entries(cocktail);
    cocktailEntries.forEach(entry => {
        if(isIngredient(entry)){
            //  GET INGREDIENT AND MEASUREMENT VALUES
            const num = entry[0].slice(13);
            const ingredient = entry[1];
            const measurement = cocktail[`strMeasure${num}`] || 'Amount Not Specified';
            //  IF VALUES EXIST PUSH ENTRIES TO NEW OBJ
            if(ingredient && measurement){
                ingredientsObj[`${ingredient}`] = measurement;
            };
        };
    });
    return ingredientsObj;
};



const addToPage = (content, element) => element.textContent = content;
const addImgToPage = (src, element) => element.src = src;

const getContainerChildren = (id) => Array.from(document.querySelector(`#${id}`).children);

const getElFromContainer = (arr, className) => arr.filter(elem => elem.classList.contains(className));

const getImgEl = arr => getElFromContainer(arr, 'thumb-img');
const getTitleEl = arr => getElFromContainer(arr, 'cocktail-title');
const getInstructionsEl = arr => getElFromContainer(arr, 'instructions');
const getIsAlcoholicEl = arr => getElFromContainer(arr, 'alcoholic-flag')
const getListEl = arr => getElFromContainer(arr, 'ingredients-list');

const hasClass = (elem, className) => elem.classList.contains(className);
const addClassToEl = (elem, className) => elem.classList.add(className);
const removeClassFromEl = (elem, className) => elem.classList.remove(className);

const addLoading = section => {
    const loadingHTML =
    `<h1 class="loading-h1">Loading...</h1>
    <div id="logo-container" class="animate-loading">
            <div id="glass-container">
                <div id="top-glass"></div>
                <div id="middle-glass"></div>
                <div id="bottom-glass"></div>
            </div>
        </div>`  
        section.innerHTML = loadingHTML;
};
const removeLoading = section => section.innerHTML = '';

const filterDrinksByInput = (parsedInput, allDrinks) => {
    return allDrinks.filter(drink => {
        let bool = false;
        for(let entry of Object.entries(drink)){
            if(entry[1] === parsedInput){
                bool = true;
            };
        };
        if(bool) return drink;
    });
};

const addNoResultsText = section => section.innerHTML = `<p class="error-message">Sorry, we can\'t seem to find what you\'re looking for</p>`;

const clearField = input => input.value = '';

const compose = (fn1, fn2) => (arg) => fn2(fn1(arg));
//  PARSING NEEDED FOR INGREDIENTS CHECK ON API
const makeLowercase = input => input.toLowerCase();
const uppercaseFirstLetter = input => input.charAt(0).toUpperCase() + input.slice(1);
const fullyParseIngredient = compose(makeLowercase, uppercaseFirstLetter);

const getIngredientsListElFromArticle = (article) => {
    const articleChildren = Array.from(article.firstElementChild.children);
    return articleChildren.filter(child => child.classList.contains('ingredients-list'))[0];
}

export { addContentToRootDiv, getEl, fetchCocktail, getTitle, isAlcoholic, getImage, getInstructions, getIngredients, compose, getImgEl, getListEl, getContainerChildren, getInstructionsEl, getTitleEl, getIsAlcoholicEl, addToPage, addImgToPage, hasClass, addClassToEl, removeClassFromEl, addLoading, removeLoading, filterDrinksByInput, addNoResultsText, clearField, fullyParseIngredient, isIngredient, getIngredientsListElFromArticle };