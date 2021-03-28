import  { getFilteredDrinksByName } from "../model/getFilteredDrinksByName.js";
import { cocktailsState } from "../model/state.js";
import SearchByNameView from "../views/view-searchByName.js";
import { clearInputField } from "./searchbyingredient-route.js";

const getFilteredDrinks = async (input) => {
    await getFilteredDrinksByName(input);
    const { success: filteredDrinks, error } = cocktailsState.filteredDrinksByName;
    if(error !== null){
        return false;
    }
    return filteredDrinks;
};

const displayFilteredDrinks = (filteredDrinks) => {
    clearInputField();
    if(filteredDrinks){
        if(filteredDrinks.length < 1){
            SearchByNameView.addNoResultsText(section);
            return;
        }
        SearchByNameView.generateFinalMarkUp(filteredDrinks);
    }
    else {
        SearchByNameView.removeLoading(SearchByNameView.section)
        SearchByNameView.generateErrorPage(cocktailsState.filteredDrinksByName.error, SearchByNameView.section);
    };
};

export const searchByName = () => {
    SearchByNameView.generateInitialMarkup('name');
    SearchByNameView.form.addEventListener('submit', (e) => {
        e.preventDefault();
        SearchByNameView.addLoading(SearchByNameView.section);
        const inputValue = document.querySelector('#search-input').value;
        getFilteredDrinks(inputValue)
            .then(filteredDrinks => displayFilteredDrinks(filteredDrinks));
    });
};

