import { hasClass, addClassToEl, removeClassFromEl } from './util-functions.js';
import { domObj } from '../domObj.js'

const { hbMenu, navLinks, title } = domObj;

const openMenu = () => {
    removeClassFromEl(navLinks, 'hide-links');
    addClassToEl(hbMenu, 'menu-open');
};

const closeMenu = () => {
    addClassToEl(navLinks, 'hide-links');
    removeClassFromEl(hbMenu, 'menu-open');
};

function handleClick(){
    if(hasClass(navLinks, 'hide-links')){
        openMenu();
    }
    else {
        closeMenu();
    };
};

const handleTitleClick = () => {
    if(!hasClass(navLinks, 'hide-links')){
        closeMenu();
    }
}

title.addEventListener('click', handleTitleClick);
hbMenu.addEventListener('click', handleClick);
navLinks.addEventListener('click', handleClick);

