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
        onNavigate(this.id);
    }));
};

addNavigationToLinks(navLinks, onNavigate);

window.onpopstate = () => loadPage(window.location.pathname);