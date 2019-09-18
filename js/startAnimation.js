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
    currentPool: 0,
  };

  sprite.onload = () => {
    stateLoad.loaderControl = true;
  };

  sprite.src = path;

  return stateLoad;
};

let diamondStart = loadSprite('./img/start.png', 392, 372, 4);
let diamondMiddle;
let diamondFinish;
let ratioSize = 0.2;
let finishRatioSizeY = 1;
let finishRatioSizeX = 1;

// eslint-disable-next-line no-shadow
const drawAnimation = (diamond, ratioSize, finishRatioSizeX, finishRatioSizeY) => {
  if (!diamond.loaderControl) return;

  context.drawImage(diamond.domObject,
    diamond.width * (diamond.currentFrame - 1),
    diamond.height * 0,
    diamond.width,
    diamond.height,
    canvas.width * 0.5 - (diamond.width * ratioSize * 0.5 * finishRatioSizeX),
    canvas.height * 0.5 - (diamond.height * ratioSize * 0.5 * finishRatioSizeY),
    diamond.width * ratioSize,
    diamond.height * ratioSize);
};

const timerId = setInterval(() => {
  if (diamondStart.currentFrame === diamondStart.quantityFrame) {
    diamondStart.currentFrame = 1;
    diamondStart.currentPool += 1;
  } else diamondStart.currentFrame += 1;

  if (diamondStart.currentPool === 2) {
    clearInterval(timerId);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawAnimation(diamondStart, ratioSize, finishRatioSizeX, finishRatioSizeY);
  ratioSize += 0.1;

  if (diamondStart.currentPool === 2) {
    diamondStart = null;
    diamondMiddle = loadSprite('./img/middle.png', 448, 432, 4);
    clearInterval(timerId);
  }
}, 200);


const timerId2 = setTimeout(() => {
  const timerId3 = setInterval(() => {
    if (diamondMiddle.currentFrame === diamondMiddle.quantityFrame) {
      diamondMiddle.currentFrame = 1;
      diamondMiddle.currentPool += 1;
    } else diamondMiddle.currentFrame += 1;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAnimation(diamondMiddle, ratioSize, finishRatioSizeX, finishRatioSizeY);
    ratioSize = 0.8;

    if (diamondMiddle.currentPool === 2) {
      diamondMiddle = null;
      diamondFinish = loadSprite('./img/finish.png', 325, 335, 4);
      clearTimeout(timerId2);
      clearInterval(timerId3);
    }
  }, 200);
}, 1600);

const timerId4 = setTimeout(() => {
  const timerId5 = setInterval(() => {
    if (diamondFinish.currentFrame === diamondFinish.quantityFrame) {
      diamondFinish.currentFrame = 1;
      diamondFinish.currentPool += 1;
    } else diamondFinish.currentFrame += 1;

    if (diamondFinish.currentPool === 2) {
      clearTimeout(timerId4);
      clearInterval(timerId5);
    }
    ratioSize -= 0.06;
    finishRatioSizeX += 0.5;
    finishRatioSizeY += 0.5;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAnimation(diamondFinish, ratioSize, finishRatioSizeX, finishRatioSizeY);
  }, 200);
}, 3200);
