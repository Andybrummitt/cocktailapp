import { addToRootDiv, fetchCocktail, addLoading, removeLoading, filterDrinksByInput } from "./util-functions";

export const searchByType = async (type, getResults) => {
    const content = `
    <form action="/" id="search-form">
        <label id="${type}-search">Search by ${type}:</label>
        <input type="search" name="${type}" id="search-input">
        <button type="submit">Search</button>
    </form>
    <section class="search-results"></section>
    `;
    addToRootDiv(content);
    
    const form = document.querySelector(`#search-form`);
    const resultsSection = document.querySelector('.search-results');
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const inputValue = this.children[1].value;
        getResults(inputValue, resultsSection);
    }); 
};