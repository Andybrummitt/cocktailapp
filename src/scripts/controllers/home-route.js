import { addContentToRootDiv, getEl } from "../controllers/util-functions";

const content = `
<div class="home-container">
    <p class="welcome-msg">Welcome to Cocktails!</p>
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

export const home = () => {
    addContentToRootDiv(content);
    showText();
};

function showText(){
    const titleOverlay = getEl('title-overlay');
    console.log(titleOverlay)
    setTimeout(() => {
        titleOverlay.style.animationName = 'text-appear';
    }, 400)
};