import { home } from '../controllers/route-controllers/home-route.js'
import { whatCanIMake } from '../controllers/route-controllers/whatcanimake/whatcanimake-route.js'
import { searchByIngredient } from '../controllers/route-controllers/searchbyingredient-route.js';
import { randomCocktail } from '../controllers/route-controllers/randomCocktail-route.js';
import { easiestCocktails } from '../controllers/route-controllers/easiestcocktail-route.js';
import { searchByName } from '../controllers/route-controllers/searchbyname-route.js';

export const routes = {
    '/' : whatCanIMake,
    '/whatcanimake': home,
    '/searchbyingredient': searchByIngredient,
    '/searchbyname': searchByName,
    '/easiestcocktails': easiestCocktails,
    '/randomcocktail': randomCocktail
  };