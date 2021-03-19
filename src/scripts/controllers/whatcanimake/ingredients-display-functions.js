import { removeFromState } from './ingredients-state.js';

export const removeIngredientFromDOM = (ev) => {
    const liToRemove = ev.target.parentElement.parentElement;
    liToRemove.remove();
};

export const createRemoveIngredientBtn = () => {
    const button = document.createElement('button');
    button.textContent = 'Remove';
    button.classList.add('remove-ingredient-btn');
    return button;
};

export const createElementsForIngredient = () => {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    return [li, div, span];
}

export const displayIngredientOnDOM = (inputValue, ul, button) => {
    const [ li, div, span ] = createElementsForIngredient();
    span.textContent = inputValue;
    //  APPEND TO HTML
    div.append(span);
    div.append(button);
    li.append(div);
    ul.append(li);
};


