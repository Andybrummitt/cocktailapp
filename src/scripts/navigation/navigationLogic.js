import ingredientsState from '../controllers/route-controllers/whatcanimake/ingredients-state.js';
import { routes } from './routes.js';

export const loadPage = pathname => routes[pathname]();

const onNavigate = pathname => {
    const pagePath = `/${pathname}`;
    const fullUrl = window.location.origin + pagePath;
    window.history.pushState({}, '', fullUrl);
    loadPage(pagePath);
};

const navLinks = Array.from(document.querySelectorAll('.nav-anchor'));

const addNavigationToLinks = (links, onNavigate) => {
    links.forEach(link => link.addEventListener('click', function(e){
        e.preventDefault();
        ingredientsState.ingredients = [];
        onNavigate(this.id);
    }));
};

addNavigationToLinks(navLinks, onNavigate);

window.onpopstate = () => {
    ingredientsState.ingredients = [];
    loadPage(window.location.pathname);
};