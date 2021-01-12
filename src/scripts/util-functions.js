import { domObj } from './domObj.js';
const { rootDiv, cocktailTitles, cocktailImgs, cocktailIngredients, cocktailInstructions } = domObj;

const addToRootDiv = content => rootDiv.innerHTML = content;
const getEl = id => document.querySelector(`#${id}`);

const fetchCocktail = async (url) => {
    try {
        const response = await fetch(url);
        const jsonRes = await response.json();
        return jsonRes;
    }
    catch(err){
        console.log(err)
        return err;
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
            const measurement = cocktail[`strMeasure${num}`];
            //  IF VALUES EXIST PUSH ENTRIES TO NEW OBJ
            if(ingredient && measurement){
                ingredientsObj[`${ingredient}`] = measurement;
            };
        };
    });
    return ingredientsObj;
};

const compose = (fn1, fn2) => fn2(fn1);

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



export { addToRootDiv, getEl, fetchCocktail, getTitle, isAlcoholic, getImage, getInstructions, getIngredients, compose, getImgEl, getListEl, getContainerChildren, getInstructionsEl, getTitleEl, getIsAlcoholicEl, addToPage, addImgToPage, hasClass, addClassToEl, removeClassFromEl };