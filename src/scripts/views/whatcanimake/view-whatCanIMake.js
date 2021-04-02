import { makeCocktailTemplate } from "../../controllers/controller-util-functions/cocktailtemplate";
import { makeCocktailObj } from "../../controllers/controller-util-functions/makeCocktailObj";
import { getIngredientsListElFromArticle, getIngredientString } from "../../controllers/util-functions";
import PageView from "../PageView";
import { outputIngredients } from "../view-util-functions/outputIngredients";


class WhatCanIMakeView extends PageView {
    constructor(){
        super();
        this.section = null;
    }
    generateInitialMarkUp(){
        const content = `
        <div id="whatcanimake-div">
            <p>Add your ingredients below</p>
            <form action="/" id="ingredients-form">
                <input name="ingredient-input" placeholder="Add Ingredient" id="ingredient-input">
                <button type="submit">Add Ingredient</button>
            </form>
            <ul class="your-ingredients"></ul>
            <button id="whatcanimake-btn">What Can I Make?</button>
        </div>
        <section class="search-results"></section>
        `;
        this.addContentToRootDiv(content);
        this.section = document.querySelector('.search-results');
    }
    generateFinalMarkUp(cocktailsByNumberOfIngredientsMissing, usersOwnIngredients){
        this.removeLoading(this.section);
        for(let amountOfIngredientsMissing in cocktailsByNumberOfIngredientsMissing){
            if(amountOfIngredientsMissing > 0 && cocktailsByNumberOfIngredientsMissing[amountOfIngredientsMissing].length > 0){
                this.displayMissingIngredientsHeading(amountOfIngredientsMissing);
            };
            for(let cocktail of cocktailsByNumberOfIngredientsMissing[amountOfIngredientsMissing]){
                //  OUTPUT HTML 
                this.displayCocktail(cocktail, usersOwnIngredients);
            };
        };
    }
    displayCocktail(cocktail, usersOwnIngredients){
        const article = document.createElement('article');
        const cocktailObj = makeCocktailObj(cocktail);
        article.innerHTML = makeCocktailTemplate(cocktailObj);
        //  OUTPUT INGREDIENTS LIST HTML
        const { ingredientsList } = cocktailObj;
        const ingredientsEl = getIngredientsListElFromArticle(article);
        outputIngredients(ingredientsEl, ingredientsList);
        this.section.append(article);
        this.colorMissingIngredientsRed(ingredientsEl, usersOwnIngredients)
    }
    colorMissingIngredientsRed(ingredientsEl, usersOwnIngredients){
        const ingredientListItems = Array.from(ingredientsEl.children);
        for(let ingredientListItem of ingredientListItems){
            const ingredientString = getIngredientString(ingredientListItem);
            if(!usersOwnIngredients.includes(ingredientString)){
                ingredientListItem.classList.add('missing-ingredient');
                };      
        };
    }
    generateNoIngredientsError(){
        const p = document.createElement('p');
        p.classList.add('error-message');
        p.textContent = 'Please input your ingredients and try again'; 
        this.section.append(p);
        setTimeout(() => p.remove(), 3000)
    }
    generateNoCocktailsMessage(){
        const noCocktailsHTML = `<p class="error-message missing-ingredients-title">Sorry it doesn't seem like you have <b>all</b> the ingredients for any cocktails</p>`
        this.section.innerHTML = noCocktailsHTML;
    }
    displayMissingIngredientsHeading(amountOff){
        const h3 = document.createElement('h3');
        h3.textContent = `Cocktails which you are missing ${amountOff} ingredient${amountOff > 1 ? 's' : ''} for`;
        h3.classList.add('missing-n-ingredients-heading')
        this.section.append(h3);
    }
}

export default new WhatCanIMakeView();

//generate intial markup
//make new class to add listeners to buttons, store ingredients state, display ingredients
