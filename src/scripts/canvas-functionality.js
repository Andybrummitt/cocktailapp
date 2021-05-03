const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const container = document.querySelector('#canvas-container');
const checkbox = document.querySelector('#check');

let finishedScrolling = true;
let finishedResizing = true;
let animationRunning = true;
let fontSize = Math.min(45, Math.floor(window.innerWidth / 15));
ctx.font = `${fontSize}px Arial`;

let cocktailContainerWidth = Math.min(800, 0.85 * canvas.width);
let columnWidth = (canvas.width - cocktailContainerWidth) / 2;
let rightColumnPadding = 0.08 * canvas.width;

const animationIsOffScreen = (yCoord) => {
    if(yCoord < 0){
        return true;
    }
    return false;
}

class Emoji {
    constructor(emoji, yCoord, sideOfScreen, speed){
        this.emoji = emoji;
        this.sideOfScreen = sideOfScreen;
        this.xCoord = this.getXCoord();
        this.yCoord = yCoord;
        this.speed = speed;
    }
    getXCoord(){
        const side = this.sideOfScreen;
        let xCoord;
        this.columnWidth = columnWidth;
        if(side === 'left'){
            xCoord = Math.random() * columnWidth;
        }
        else {
            xCoord = (Math.random() * columnWidth) + cocktailContainerWidth + columnWidth;
        }
        return xCoord;
    }
    draw(){
        ctx.fillText(this.emoji, this.xCoord, this.yCoord);
    }
    update(){
        if(finishedScrolling === false || finishedResizing === false){
            return;
        }
        //  If Window has resized
        if(this.columnWidth !== columnWidth){
            this.xCoord = this.getXCoord();
        }
        if(animationIsOffScreen(this.yCoord)){
            this.yCoord = canvas.height;
        }
        
        this.yCoord = Math.round(this.yCoord) - this.speed;
        this.draw();
    }
};

const emojis = ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🍒','🍑','🥭','🍍','🥥','🥝'];


function getEmojiObjArray(emojis){
    let emojiObjArr = [];
    emojis.forEach((emoji, index) => {
        let speed = Math.round(Math.random()) + 1;
        if(index % 2 === 0){ 
            const emojiObj = new Emoji(emoji, Math.random() * 3000, 'left', speed);
            emojiObjArr.push(emojiObj);
        }
        else {
            const emojiObj = new Emoji(emoji, Math.random() * 3000, 'right', speed);
            emojiObjArr.push(emojiObj)
        }
    });
    return emojiObjArr;      
};

const emojiObjArr = getEmojiObjArray(emojis);

//--------------------------------------- animation scroll callbacks -----------------------------------

let animationID;

const stopAnimation = (animationID) => {
    cancelAnimationFrame(animationID);
};

const restartAnimation = (animationFn) => {
        requestAnimationFrame(animationFn)
};

const stopAnimationAndRestart = () => {
    finishedScrolling = true;
    if(animationRunning){
        animationRunning = false;
        canvas.style.height = '100vh';
        stopAnimation(animationID);
        restartAnimation(step);
    }
}

const fireCallbackWhenUserStopsScrolling = (callback) => {
        let isScrolling;
        window.addEventListener('scroll', () => {
            finishedScrolling = false;
            clearTimeout(isScrolling);
            isScrolling = setTimeout(callback, 500);
        });
    }

function step(timestamp){
    animationRunning = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    emojiObjArr.forEach((emojiObj) => {
        emojiObj.update()
    })
    animationID = requestAnimationFrame(step);
}

//  Call animation for the first time
animationID = requestAnimationFrame(step);

//  Toggle animation visibility logic
checkbox.addEventListener('click', () => {
    if(checkbox.checked === true){
        requestAnimationFrame(step) 
        finishedScrolling = true;
        finishedResizing = true;
    }
    else if(checkbox.checked === false){
        animationRunning = false;
        cancelAnimationFrame(animationID);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
});

const resizeCanvasSettings = () => {
    canvas.width = window.innerWidth;
    let fontSize = Math.min(45, Math.floor(window.innerWidth/15));
    cocktailContainerWidth = Math.min(800, 0.85 * canvas.width);
    columnWidth = (canvas.width - cocktailContainerWidth) / 2;
    rightColumnPadding = 0.08 * canvas.width;
    ctx.font = `${fontSize}px Arial`;
};

const handleResize = () => {
    resizeCanvasSettings();
    if(animationRunning){
        animationRunning = false;
        stopAnimation(animationID);
        finishedResizing = true;
        restartAnimation(step);
    }
};

const fireCallbackWhenUserStopsResizing = (callback) => {
    let isResizing;
        window.addEventListener('resize', () => {
            finishedResizing = false;
            clearTimeout(isResizing);
            isResizing = setTimeout(callback, 500);
        });
};

onresize = fireCallbackWhenUserStopsResizing(handleResize);
onscroll = fireCallbackWhenUserStopsScrolling(stopAnimationAndRestart);