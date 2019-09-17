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
  let diamondMiddle; 
  let diamondFinish;
  let ratioSize = 0.2

  let count = 0;
  const drawAnimation = (diamond,ratioSize) => {
    
    console.log(++count);
      if(!diamond.loaderControl) return;
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
      }      
  }, 200)


  const timerId2 = setTimeout(() => {
    const timerId3 = setInterval(() => {

      ratioSize = 0.8  
  
      if(diamondMiddle.currentFrame === diamondMiddle.quantityFrame) {
          diamondMiddle.currentFrame = 1;
          diamondMiddle.currentPool++;
      } else diamondMiddle.currentFrame++;
  
      if(diamondMiddle.currentPool === 2) {
          diamondMiddle = null;
          diamondFinish = loadSprite('./img/finish.png', 325, 335, 4);
          clearTimeout(timerId2);
          clearInterval(timerId3);        
      }
    
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawAnimation(diamondMiddle, ratioSize);      
  }, 200)
}, 1600)

const timerId4 = setTimeout(() => {
  const timerId5 = setInterval(() => {     

    if(diamondFinish.currentFrame === diamondFinish.quantityFrame) {
        diamondFinish.currentFrame = 1;
        diamondFinish.currentPool++;
    } else diamondFinish.currentFrame++;

    if(diamondFinish.currentPool === 2) {        
        clearTimeout(timerId4);
        clearInterval(timerId5);        
    }
    ratioSize -= 0.1;
  
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAnimation(diamondFinish, ratioSize);      
}, 200)
}, 3400)

  
