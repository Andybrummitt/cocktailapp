import ingredientsState from "./ingredients-state";
import IngredientsDisplayHandler from '../../../views/whatcanimake/ingredients-display-functions.js';
import { clearField } from "../../util-functions";


export const addRemoveButtonFunctionality = (button, ingredient) => {
    button.addEventListener('click', e => {
        IngredientsDisplayHandler.removeIngredientFromDOM(e, ingredient);
        ingredientsState.removeFromState(ingredient);
    });
};

export const addIngredient = (inputField, ul) => {
    const ingredient = inputField.value;
    const button = IngredientsDisplayHandler.createRemoveIngredientBtn();
    IngredientsDisplayHandler.displayIngredientOnDOM(ingredient, ul, button);
    ingredientsState.addToState(ingredient);
    addRemoveButtonFunctionality(button, ingredient);
    clearField(inputField); 
};

export const handleIngredientInputOnSubmit = ({inputField, ul, ingredientsForm}, ev) => {
    ev.preventDefault();
        const inputValue = inputField.value;
        //  FORM VALIDATION
        if(inputValue && !ingredientsState.ingredients.includes(inputValue)){
            addIngredient(inputField, ul);
        }
        else if(inputValue && ingredientsState.ingredients.includes(inputValue)){
            IngredientsDisplayHandler.ingredientAlreadyAddedMessage(ingredientsForm)
            clearField(inputField);
    };
};