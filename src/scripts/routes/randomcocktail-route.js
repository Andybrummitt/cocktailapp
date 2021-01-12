import { addToRootDiv, fetchCocktail, getTitle, isAlcoholic, getImage, getInstructions, getIngredients, compose, getContainerChildren, getImgEl, getInstructionsEl, getListEl, getTitleEl, addToPage, getIsAlcoholicEl, addImgToPage } from "../util-functions";

export const randomCocktail = async () => {
    
    const fetchedJson = await fetchCocktail('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const cocktail = fetchedJson.drinks[0];
    const cocktailObj = {
        img: getImage(cocktail),
        ingredientsList: getIngredients(cocktail),
        title: getTitle(cocktail),
        alcoholicFlag: isAlcoholic(cocktail),
        instructions: getInstructions(cocktail)
    };

    const { img, ingredientsList, title, alcoholicFlag, instructions } = cocktailObj;

    // const ingredientsHTML = Object.entries(ingredientsList).map(ingredient => `<li>${ingredient[0]}: ${ingredient[1]}</li>`);

    const content = `
        <button class="randomise">Randomise Again!</button>
        <div class="cocktail-container" id="random-cocktail">
            <h1 class="cocktail-title">${title}</h1>
            <div><span class="alcoholic-flag">${alcoholicFlag}</span><i class="fas fa-check"></i></div>
            <img class="thumb-img" src="${img}" alt="image-of-cocktail">
            <h2 class="ingredients-h2">Ingredients</h2>
            <ul class="ingredients-list"></ul>
            <h2>Instructions</h2>   
            <p class="instructions">${instructions}</p> 
        </div>`;
    addToRootDiv(content)

    const randomiseBtn = document.querySelector('.randomise');
    const ingredientsEl = document.querySelector('.ingredients-list');

    const outputIngredients = () => {
        const ingredientsArr = Object.entries(ingredientsList);
        for(let entry of ingredientsArr){
            const li = document.createElement('li');
            li.textContent = `${entry[0]}: ${entry[1]}`;
            ingredientsEl.append(li);
        };
    };
    outputIngredients();

    randomiseBtn.addEventListener('click', randomCocktail);

    // const imgEl = compose(getContainerChildren('random-cocktail'), getImgEl);
    // const instructionsEl = compose(getContainerChildren('random-cocktail'), getInstructionsEl);
    
    // const titleEl = compose(getContainerChildren('random-cocktail'), getTitleEl);
    // const alcoholicFlagEl = compose(getContainerChildren('random-cocktail'), getIsAlcoholicEl);

    // addImgToPage(cocktailObj.img, imgEl);
    // addToPage(cocktailObj.title, titleEl);
    // console.log(titleEl.textContent)
    // addToPage(cocktailObj.instructions, instructionsEl);
    // addToPage(cocktailObj.alcoholicFlag, alcoholicFlagEl);
    
}


