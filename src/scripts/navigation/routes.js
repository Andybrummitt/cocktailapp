import { home } from '../controllers/home-route.js'
import { whatCanIMake } from '../controllers/whatcanimake/whatcanimake-route.js'
import { searchByIngredient } from '../controllers/searchbyingredient-route.js';
import { randomCocktail } from '../controllers/randomCocktail.js';
import { easiestCocktails } from '../controllers/easiestcocktail-route.js';
import { searchByName } from '../controllers/searchbyname-route.js';

export const routes = {
    '/' : home,
    '/whatcanimake': whatCanIMake,
    '/searchbyingredient': searchByIngredient,
    '/searchbyname': searchByName,
    '/easiestcocktails': easiestCocktails,
    '/randomcocktail': randomCocktail
  };