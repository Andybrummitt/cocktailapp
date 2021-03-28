import { getAllDrinks } from '../model/getAllDrinks.js';
import { cocktailsState } from "../model/state";
import { clearField, filterDrinksByInput, fullyParseIngredient } from "./util-functions";
import SearchByIngredientView from '../views/view-searchByIngredient.js';

const getFilteredDrinks = async (input) => {
    if(cocktailsState.allDrinks.success === null){
        await getAllDrinks();
    }
    const { success: allDrinks, error } = cocktailsState.allDrinks;
    if(error !== null){
        return false;
    }
    else {
        //  UPPERCASE FIRST LETTER OF INPUT
        const parsedInput = fullyParseIngredient(input);
        //  FILTER DRINKS BASED ON INPUT INGREDIENTS
        const filteredDrinks = filterDrinksByInput(parsedInput, allDrinks);
        return filteredDrinks;
    };
};
    
export const clearInputField = () => {
    const searchField = document.querySelector('#search-input');
    clearField(searchField);
};

const displayFilteredDrinks = (filteredDrinks) => {
    clearInputField();
    if(filteredDrinks){
        if(filteredDrinks.length < 1){
            SearchByIngredientView.addNoResultsText(section);
            return;
        }
        SearchByIngredientView.generateFinalMarkUp(filteredDrinks);
    }
    else {
        SearchByIngredientView.removeLoading(SearchByIngredientView.section);
        SearchByIngredientView.generateErrorPage(cocktailsState.allDrinks.error, SearchByIngredientView.section);
    };
};

export const searchByIngredient = () => {
    SearchByIngredientView.generateInitialMarkUp('ingredient');
    SearchByIngredientView.form.addEventListener('submit', (e) => {
        e.preventDefault();
        SearchByIngredientView.addLoading(SearchByIngredientView.section);
        const inputValue = document.querySelector('#search-input').value;
        getFilteredDrinks(inputValue)
            .then(filteredDrinks => displayFilteredDrinks(filteredDrinks));
    });
};