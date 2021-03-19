import { makeCocktailTemplate } from "../controllers/controller-util-functions/cocktailtemplate";
import { outputIngredients } from "./views-util-functions/outputIngredients";

class RandomCocktailView {
    constructor(){
        this.rootDiv = document.querySelector('#root');
    }
    
    generateMarkUp(cocktailObj){
        const { ingredientsList } = cocktailObj;
        const cocktailTemplate = makeCocktailTemplate(cocktailObj);
        const content = `<button class="randomise">Randomise Again!</button>${cocktailTemplate}`; 
        const ingredientsEl = document.querySelector('.ingredients-list');
        outputIngredients(ingredientsEl, ingredientsList); 
        this.addContentToRootDiv(content);
    }
    addContentToRootDiv(content){
        this.rootDiv.innerHTML = content;
    }
}

export default new RandomCocktailView();