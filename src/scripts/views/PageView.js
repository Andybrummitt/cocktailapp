import { makeCocktailTemplate } from "../controllers/controller-util-functions/cocktailtemplate";
import { makeCocktailObj } from "../controllers/controller-util-functions/makeCocktailObj";
import { getIngredientsListElFromArticle } from "../controllers/util-functions";
import { outputIngredients } from "./view-util-functions/outputIngredients";

export default class PageView {
    constructor(){
        this.rootDiv = document.querySelector('#root');
    }
    addLoading(section){
        const loadingHTML =
        `<h1 class="loading-h1">Loading...</h1>
        <div id="logo-container" class="animate-loading">
                <div id="glass-container">
                    <div id="top-glass"></div>
                    <div id="middle-glass"></div>
                    <div id="bottom-glass"></div>
                </div>
            </div>`  
            section.innerHTML = loadingHTML;
    }
    removeLoading(section){
        section.innerHTML = '';
    }
    addContentToRootDiv(content){
        this.rootDiv.innerHTML = content;
    }
    generateErrorPage(err, section){
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="error-message">
            Sorry there appears to be a problem with your request<br>
            ${err}
            </p>`;
        section.append(div);
    }
    displayCocktails(cocktails, section){
        for(let cocktail of cocktails){
            const cocktailObj = makeCocktailObj(cocktail);
            const cocktailHTML = makeCocktailTemplate(cocktailObj);
            const article = document.createElement('article');
            article.innerHTML = cocktailHTML;
            section.append(article);
            const ingredientsEl = getIngredientsListElFromArticle(article);
            outputIngredients(ingredientsEl, cocktailObj.ingredientsList);
        };
    };
}