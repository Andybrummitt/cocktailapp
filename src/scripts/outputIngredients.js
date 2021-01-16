export const outputIngredients = (ingredientsEl, ingredientsList) => {
        const ingredientsArr = Object.entries(ingredientsList);
        for(let entry of ingredientsArr){
            const li = document.createElement('li');
            li.textContent = `${entry[0]}: ${entry[1]}`;
            ingredientsEl.append(li);
        };
    };