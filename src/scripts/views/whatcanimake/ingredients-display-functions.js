class IngredientsDisplayHandler {
    constructor(){
    }
    removeIngredientFromDOM(ev){
        const liToRemove = ev.target.parentElement.parentElement;
        liToRemove.remove();
    }
    createRemoveIngredientBtn(){
        const button = document.createElement('button');
        button.classList.add('remove-ingredient-btn');
        const icon = document.createElement('i');
        icon.classList.add('fas', 'fa-trash-alt');
        button.append(icon);
        return icon;
    }
    createElementsForIngredient(){
        const li = document.createElement('li');
        const div = document.createElement('div');
        const span = document.createElement('span');
        return [li, div, span];
    }
    displayIngredientOnDOM(inputValue, ul, button){
        const [ li, div, span ] = this.createElementsForIngredient();
        span.textContent = inputValue;
        //  APPEND TO HTML
        div.append(span);
        div.append(button);
        li.append(div);
        ul.append(li);
    }
    ingredientAlreadyAddedMessage(){
        const section = document.querySelector('.search-results');
        section.innerHTML = `<p class="error-message">You have already added that ingredient</p><i class="far fa-trash-alt"></i>`;
        setTimeout(() => section.innerHTML = '', 3000);
    }
}

export default new IngredientsDisplayHandler();