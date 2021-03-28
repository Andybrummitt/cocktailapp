import { makeCocktailObj } from './controller-util-functions/makeCocktailObj.js'; 
import { getRandomCocktail } from "../model/getRandomCocktail";
import RandomCocktailView from '../views/view-randomCocktails.js';
import { cocktailsState } from '../model/state.js';

const addButtonListener = () => {
    const randomiseBtn = document.querySelector('.randomise');
        randomiseBtn.addEventListener('click', randomCocktail);  
};

export const randomCocktail = async () => {
    RandomCocktailView.generateInitialMarkUp();
    await getRandomCocktail();
    const { success: randomCocktail, error } = cocktailsState.randomCocktail;
    addButtonListener();
    if(randomCocktail){
        const cocktailObj = makeCocktailObj(randomCocktail);
        RandomCocktailView.generateFinalMarkUp(cocktailObj); 
    }
    else {
        RandomCocktailView.generateErrorPage(error, RandomCocktailView.section);
    }
};

