const ingredientsState =  {
    ingredients: [],
    addToState(ingredient){
        this.ingredients.push(ingredient);
    },
    removeFromState(ingredient){
        this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
    }
}

export default ingredientsState;