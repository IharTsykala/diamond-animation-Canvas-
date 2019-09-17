const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const sprite = document.createElement('img');

const loadSprite = (path, width, height, quantityFrame) => {  

  const stateLoad = {
    domObject: sprite,
    width,
    height,
    quantityFrame,
    loaderControl: false,
    currentFrame: 1,
    currentPool: 0
  }

  sprite.onload = () => {
    stateLoad.loaderControl = true;
  }

  sprite.src = path;
  

  return stateLoad;
}  

let diamondStart = loadSprite('./img/start.png', 392, 372, 4);
let diamondMiddle 
// const diamondFinish = loadSprite('./img/finish.png', 392, 372, 4);

let count = 0;
const drawAnimation = (diamond,ratioSize) => {
  
  console.log(++count);
    if(!diamondStart.loaderControl) return;
    console.log( diamond.currentFrame, diamond.currentPool);

    context.drawImage
    (diamond.domObject,    
     diamond.width * (diamond.currentFrame-1),
     diamond.height * 0,
     diamond.width,
     diamond.height,
     canvas.width*0.5-(diamond.width*ratioSize*0.5),
     canvas.height*0.5-(diamond.height*ratioSize*0.5),
     diamond.width*ratioSize,
     diamond.height*ratioSize)
}

console.log(sprite.src);


  

  let ratioSize = 0.2
const timerId = setInterval(() => {

    if(diamondStart.currentFrame === diamondStart.quantityFrame) {
        diamondStart.currentFrame = 1;
        diamondStart.currentPool++;
    } else diamondStart.currentFrame++;

    if(diamondStart.currentPool === 2) {
        clearInterval(timerId);

    }
  
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAnimation(diamondStart, ratioSize);
    ratioSize += 0.1

    if(diamondStart.currentPool === 2) {
      diamondStart = null;
      diamondMiddle = loadSprite('./img/middle.png', 448, 432, 4);
      clearInterval(timerId);
      console.log(diamondMiddle);    
    }
      
   
    
}, 200)
