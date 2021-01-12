import '../styles/main.scss';
import { home } from './routes/home-route.js';
import { whatCanIMake } from './routes/whatcanimake-route.js';
import { searchByAlcohol } from './routes/searchbyalcohol-route.js';
import { searchByMixer } from './routes/searchbymixer-route.js';
import { randomCocktail } from './routes/randomcocktail-route.js';
import { easiestCocktails } from './routes/easiestcocktail-route.js';
import { searchByName } from './routes/searchbyname-route.js';
import './nav-functionality.js'

const routes = {
    '/' : home,
    '/whatcanimake': whatCanIMake,
    '/searchbyname': searchByName,
    '/searchbyalcohol': searchByAlcohol,
    '/searchbymixer': searchByMixer,
    '/easiestcocktails': easiestCocktails,
    '/randomcocktail': randomCocktail
  };

routes[window.location.pathname]();

const onNavigate = (pathname) => {
    const pagePath = `/${pathname}`;
    window.history.pushState(
        {},
        '',
        window.location.origin + pagePath
        );
    routes[pagePath]();
}

const navLinks = Array.from(document.querySelectorAll('.nav-anchor'));

const addNavigationListenersToLinks = (links, cb) => {
    links.forEach(link => link.addEventListener('click', function(e){
        e.preventDefault();
        cb(this.id)
    }));
};

addNavigationListenersToLinks(navLinks, onNavigate)
//once innerhtml is loaded into root div we need to do textappear

window.onpopstate = () => {
    routes[window.location.pathname]()
//     //call functions for logic in seperate modules
//     //1. call api get data
//     //2. display data to user
  }

