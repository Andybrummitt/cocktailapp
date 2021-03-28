export const outputIngredients = (ingredientsEl, ingredientsList) => {
        const ingredientsArr = Object.entries(ingredientsList);
        for(let entry of ingredientsArr){
            const li = document.createElement('li');
            const ingredient = entry[0];
            const measurement = entry[1];
            li.textContent = `${ingredient}: ${measurement}`;
            ingredientsEl.append(li);
        };
    };