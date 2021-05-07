import { getEl } from "../controllers/util-functions";
import PageView from "./PageView";

class HomeView extends PageView {
    constructor(){
        super();
    }
    generateLogo(){
        const content = `
            <div class="home-container">
                <p class="welcome-msg">Welcome to Mixin!</p>
                <div id="animation-title-container">
                    <div id="logo-container" class="animate-home">
                        <div id="glass-container">
                            <div id="top-glass"></div>
                            <div id="middle-glass"></div>
                            <div id="bottom-glass"></div>
                        </div>
                        <div id="liquid"></div>
                    </div>  
                <div id="title-overlay"><h1>Drink Responsibly</h1></div>
                <h1 id="title">Drink Responsibly</h1>
                </div>
            </div>
            `;
        this.addContentToRootDiv(content);
    }
    showText(){
        const titleOverlay = getEl('title-overlay');
        titleOverlay.style.animationName = 'text-appear';
    }
};

export default new HomeView();