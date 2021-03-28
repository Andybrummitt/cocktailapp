import { makeCocktailTemplate } from "../controllers/controller-util-functions/cocktailtemplate";
import PageView from "./PageView";
import { outputIngredients } from "./view-util-functions/outputIngredients";

class RandomCocktailView extends PageView {
    constructor(){
        super();
        this.section = null;
    }
    generateInitialMarkUp(){
        const content = `
        <button class="randomise">Randomise Again!</button>
        <section id="search-results"></section>`
        this.addContentToRootDiv(content);
        this.section = document.querySelector('#search-results');
    }
    generateFinalMarkUp(cocktailObj){
        const { ingredientsList } = cocktailObj;
        const cocktailTemplate = makeCocktailTemplate(cocktailObj);
        this.section.innerHTML = cocktailTemplate;
        const ingredientsEl = document.querySelector('.ingredients-list');
        outputIngredients(ingredientsEl, ingredientsList); 
    }
}

export default new RandomCocktailView();