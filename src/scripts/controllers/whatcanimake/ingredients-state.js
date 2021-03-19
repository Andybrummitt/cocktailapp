export const ingredientsState = [];

export const addToState = ingredient => ingredientsState.push(ingredient);
export const removeFromState = ingredient => {
    ingredientsState.splice(ingredientsState.indexOf(ingredient), 1);
};