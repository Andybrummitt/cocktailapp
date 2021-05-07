import { getFilteredDrinksByName } from "../../model/getFilteredDrinksByName.js";
import { cocktailsState } from "../../model/state.js";
import SearchByNameView from "../../views/view-searchByName.js";
import isText from "../isText.js";
import { clearInputField } from "./searchbyingredient-route.js";

const getFilteredDrinks = async (input) => {
    await getFilteredDrinksByName(input);
    const { success: filteredDrinks, error } = cocktailsState.filteredDrinksByName;
    return { filteredDrinks, error };
};

const displayFilteredDrinks = ({ filteredDrinks, error }) => {
    clearInputField();
    if(error === null){
        if(filteredDrinks === null || filteredDrinks.length < 1){
            SearchByNameView.addNoResultsText();
            return;
        }
        else SearchByNameView.generateFinalMarkUp(filteredDrinks);
    }
    else {
        SearchByNameView.removeLoading();
        SearchByNameView.generateErrorPage(error);
    };
};

export const searchByName = () => {
    SearchByNameView.generateInitialMarkup('name');
    SearchByNameView.form.addEventListener('submit', (e) => {
        e.preventDefault();
        SearchByNameView.addLoading(SearchByNameView.section);
        const inputValue = document.querySelector('#search-input').value;
        if(inputValue === ''){
            SearchByNameView.generateNoInputMssg();
            return;
        }
        if(!isText(inputValue)){
            SearchByNameView.generateSpecialCharacterError();
            clearInputField();
            return;
        }
        getFilteredDrinks(inputValue)
            .then(filteredDrinks => displayFilteredDrinks(filteredDrinks));    
    });
};