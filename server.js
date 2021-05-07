const express = require('express');
const path = require('path');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.static('public'));

class APIerror extends Error {
    constructor(message, status){
        super();
        this.message = message;
        this.status = status;
    };
};

app.get('/whatcanimake/search', (req, res) => {
    const getDrinksByLetter = async (letter) => {
        let data;
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.APIKEY}/search.php?f=${letter}`);
            if(response.ok){
                data = await response.json();
            }
            else {
                throw new APIerror(response.statusText, response.status);
            }
        }
        catch(err){
            return err;
        }
        const drinks = data.drinks;
        return drinks;
    }
    
    const getAllDrinks = async () => {
        let allDrinks = [];
        const alphabet ='abcdefghijklmnopqrstuvwxyz';
        for(let letter of alphabet){
            const drinksByLetterArr = await getDrinksByLetter(letter);
            if(drinksByLetterArr instanceof Error){
                const error = drinksByLetterArr;
                res.status(error.status).json({
                    error:{
                        message: error.message,
                        status: error.status
                    }
                });
                return;
            }
            drinksByLetterArr && allDrinks.push(drinksByLetterArr);
        };
        res.send(allDrinks.flat());
    };
    getAllDrinks();
})

app.get('/searchbyname/search/:name', (req, res) => {
    const getFilteredDrinksByName = async () => {
        try {
            const name = req.params.name;
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.APIKEY}/search.php?s=${name}`);
            if(response.ok){
                const jsonResponse = await response.json();
                res.send(jsonResponse.drinks);
            }   
            else {
                throw new APIerror(response.statusText, response.status);
            }
        }
        catch(err){
            res.status(err.status).json({
                error:{
                    message: err.message,
                    status: err.status
                }
            });
        }
    }
    getFilteredDrinksByName();
});

app.get('/randomcocktail/getcocktail', (req, res) => {
    const getRandomCocktail = async () => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/${process.env.APIKEY}/random.php`);
            if(response.ok){
                const jsonResponse = await response.json();
                res.send(jsonResponse.drinks[0]);
            }   
            else {
                throw new APIerror(response.statusText, response.status);
            }
        }
        catch(err){
            res.status(err.status).json({
                error:{
                    message: err.message,
                    status: err.status
                    }
                });
            }
        }
    getRandomCocktail();
});

app.get('/*', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'));
});

app.listen(port, () => console.log(`app listening at ${port}`));