import { home } from '../routesLogic/home-route.js';
import { whatCanIMake } from '../routesLogic/whatcanimake/whatcanimake-route.js';
import { searchByIngredient } from '../routesLogic/searchbyingredient-route.js';
import { randomCocktail } from '../routesLogic/randomcocktail-route.js';
import { easiestCocktails } from '../routesLogic/easiestcocktail-route.js';
import { searchByName } from '../routesLogic/searchbyname-route.js';

export const routes = {
    '/' : whatCanIMake,
    '/whatcanimake': home,
    '/searchbyingredient': searchByIngredient,
    '/searchbyname': searchByName,
    '/easiestcocktails': easiestCocktails,
    '/randomcocktail': randomCocktail
  };