import { makeCocktailObj } from './controller-util-functions/makeCocktailObj.js'; 
import { getRandomCocktail } from "../model/getRandomCocktail";
import RandomCocktailView from '../views/view-randomCocktails.js';
import { cocktailsState } from '../model/state.js';

export const randomCocktail = async () => {
    await getRandomCocktail();
    const randomCocktail = { cocktailsState }
    console.log(randomCocktail, 'random cocktail')
    if(randomCocktail){
        console.log('woooop')
        const cocktailObj = makeCocktailObj(randomCocktail);
        RandomCocktailView.generateMarkUp(cocktailObj);
        const randomiseBtn = document.querySelector('.randomise');
        randomiseBtn.addEventListener('click', randomCocktail);  
    };
};

