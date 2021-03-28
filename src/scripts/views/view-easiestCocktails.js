import { makeCocktailTemplate } from "../controllers/controller-util-functions/cocktailtemplate";
import { makeCocktailObj } from "../controllers/controller-util-functions/makeCocktailObj";
import { getIngredientsListElFromArticle } from "../controllers/util-functions";
import PageView from "./PageView";
import { outputIngredients } from "./view-util-functions/outputIngredients";

class EasiestCocktailsView extends PageView {
    constructor(){
        super();
        this.section = null;
    }
    generateInitialMarkUp(){
        const content = `<h1 class="title-dark">Easiest Cocktails</h1><section class="search-results"></section>`; 
        this.addContentToRootDiv(content);   
        this.section = document.querySelector('.search-results');
        this.addLoading(this.section);
    }
    generateFinalMarkUp(drinks){
        this.removeLoading(this.section)
        this.displayCocktails(drinks, this.section)
    }
}

export default new EasiestCocktailsView();