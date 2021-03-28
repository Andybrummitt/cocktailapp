import PageView from "./PageView";
import SearchByIngredientView from '../views/view-searchByIngredient.js';

class SearchByNameView extends PageView {
    constructor(){
        super();
    }
    generateInitialMarkup(type){
        const generateInitialSearchByNameMarkup = SearchByIngredientView.generateInitialMarkUp.bind(this);
        generateInitialSearchByNameMarkup(type);
    }
    generateFinalMarkUp(drinks){
        this.removeLoading(this.section)
        this.displayCocktails(drinks, this.section)
    }
    addNoResultsText() {
        this.section.innerHTML = `<p class="error-message">Sorry, we can\'t seem to find what you\'re looking for</p>`;
    }
}

export default new SearchByNameView();