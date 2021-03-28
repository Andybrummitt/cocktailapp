import '../styles/main.scss';
import './controllers/navbarFunctionality.js';
import { loadPage } from './navigation/navigationLogic';
import './controllers/randomCocktail.js';

loadPage(window.location.pathname);





