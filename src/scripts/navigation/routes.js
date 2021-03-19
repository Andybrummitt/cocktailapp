import { home } from '../routesLogic/home-route.js';
import { whatCanIMake } from '../controllers/whatcanimake/whatcanimake-route.js';
import { searchByIngredient } from '../routesLogic/searchbyingredient-route.js';
import { randomCocktail } from '../controllers/randomcocktail.js';
import { easiestCocktails } from '../routesLogic/easiestcocktail-route.js';
import { searchByName } from '../routesLogic/searchbyname-route.js';

export const routes = {
    '/' : randomCocktail,
    '/whatcanimake': whatCanIMake,
    '/searchbyingredient': searchByIngredient,
    '/searchbyname': searchByName,
    '/easiestcocktails': easiestCocktails,
    '/randomcocktail': home
  };