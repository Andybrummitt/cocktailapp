import '../styles/main.scss';
import './controllers/navbarFunctionality.js';
import { loadPage } from './navigation/navigationLogic';
import './controllers/route-controllers/randomCocktail-route.js';
import './canvas-functionality.js';

loadPage(window.location.pathname);
