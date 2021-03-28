import PageView from "./PageView";

class SearchByIngredientView extends PageView {
    constructor(){
        super();
        this.section = null;
        this.form = null;
        this.resultsSection = null;
    }
    generateInitialMarkUp(type){
        const content = `
            <form action="/" id="search-form">
                <label id="${type}-search">Search by ${type}:</label>
                <input type="search" name="${type}" id="search-input">
                <button type="submit">Search</button>
            </form>
            <section class="search-results"></section>
            `;
    this.addContentToRootDiv(content);
    this.form = document.querySelector(`#search-form`);
    this.resultsSection = document.querySelector('.search-results');
    this.section = document.querySelector('.search-results');
    }
    generateFinalMarkUp(drinks){
        this.removeLoading(this.section)
        this.displayCocktails(drinks, this.section)
    }
    addNoResultsText() {
        this.section.innerHTML = `<p class="error-message">Sorry, we can\'t seem to find what you\'re looking for</p>`;
    }
}



export default new SearchByIngredientView();