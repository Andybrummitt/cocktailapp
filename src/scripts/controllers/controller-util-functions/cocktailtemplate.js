export const makeCocktailTemplate = cocktailObj => {
    const { img, title, alcoholicFlag, instructions } = cocktailObj;
    return `
    <div class="cocktail-container" id="random-cocktail">
        <h1 class="cocktail-title">${title}</h1>
        <div><span class="alcoholic-flag">${alcoholicFlag}</span><i class="fas fa-check"></i></div>
        <img class="thumb-img" src="${img}" alt="image-of-cocktail">
        <h2 class="ingredients-h2">Ingredients</h2>
        <ul class="ingredients-list"></ul>
        <h2>Instructions</h2>   
        <p class="instructions">${instructions}</p> 
    </div>`;
}
