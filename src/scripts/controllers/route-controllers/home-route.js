import HomeView from '../../views/view-home.js';

export const home = () => {
    HomeView.generateLogo();
    setTimeout(() => {
        HomeView.showText();
    }, 400)
};
