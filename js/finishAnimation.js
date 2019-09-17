const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const spriteStart = document.getElementById('spriteStart');
// const spriteMiddle = document.getElementById('spriteMiddle');
// const spriteFinish = document.getElementById('spriteFinish');
spriteStart.style.display = 'none';
// spriteMiddle.style.display = 'none';
// spriteFinish.style.display = 'none';
// const spriteLinks = ['./img/bri_big_anim_start.png',
//                       './img/bri_big_anim_middle.png',
//                       './img/bri_big_anim_finish.png']
let width, height;
let num = 2;
let countCircle = 0;
let moveX = 0;
let moveY = 0;
let decrease = 1;

const drawStartState = (img, num, speedX, speedY) => {
    context.clearRect(0, 0, 400, 400);
    num = num ? num - 1 : 0;
    moveX += speedX ? speedX : 0;
    moveY += speedY ? speedY : 0;
    decrease += 0.2;

    spriteStart.onload = () => {        
         {
          console.log(img);
          context.drawImage(spriteStart, num*392, 0, 392, 370, moveX, moveY, 392/decrease, 370/decrease);
     
        width = spriteStart.width;
        height = spriteStart.height;       
    }
    spriteStart.src = img;  
}


// for (let i = 0; i < spriteLinks.length; i++) {

  drawStartState('./img/finish.png', 1, -3, -3);

  const timerId = setInterval(() => {  
    drawStartState('./img/finish.png', num, -3, -3);
    // console.log(num, countCircle);    
    if(num < 4) {
      num++;
    } else if (num === 4 && countCircle < 2) {
      num = 1;
      countCircle++
      if(countCircle === 2) {
        num = 1;
        countCircle = 0;
        clearInterval(timerId);        
      }
    }
    // console.log(num, countCircle, i);  
  }, 500)
}

// drawStartState('./img/bri_big_anim_start.png', 1);

// const timerId = setInterval(() => {  
//   drawStartState('./img/bri_big_anim_start.png', num);
//   // console.log(num, countCircle);
//   if(num < 4) {
//     num++;
//   } else if (num === 4 && countCircle < 2) {
//     num = 1;
//     countCircle++
//     if(countCircle == 2) {
//       clearInterval(timerId);
//     }
//   }
//   console.log(num, countCircle);  
// }, 100)



// drawStartState('bri_big_anim_start.png', 1);
// console.log(width, height)
// canvas.width = 1570;
// canvas.height = 370;


// class Sprite {
//   constructor(options) {
//       this.ctx = options.ctx;

//       this.image = options.image;

//       this.frameIndex = 0;
//       this.tickCount = 0;
//       this.ticksPerFrame = options.ticksPerFrame || 0;
//       this.numberOfFrames = options.numberOfFrames || 1;

//       this.width = options.width;
//       this.height = options.height;

//       this.start();
//   }

//   update() {
//       this.tickCount++;

//       if (this.tickCount > this.ticksPerFrame) {
//           this.tickCount = 0;
//           if (this.frameIndex < this.numberOfFrames - 1) {
//               this.frameIndex++;
//           } else {
//               this.frameIndex = 0;
//           }
//       }
//   }

//   render() {
//       this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height);
//       this.ctx.drawImage(
//           this.image,
//           this.frameIndex * this.width / this.numberOfFrames,
//           0,
//           this.width / this.numberOfFrames,
//           this.height,
//           0,
//           0,
//           this.width / this.numberOfFrames,
//           this.height
//       )
//   }

//   start() {
//       let loop = () => {
//           this.update();
//           this.render();

//           requestAnimationFrame(loop);
//       }
//       loop();
//   }
// }


// let sprite = new Sprite({
//     ctx: context,
//     image: diamondStartState,
//     width: 1565,
//     height: 370,
//     numberOfFrames: 4,
//     ticksPerFrame: 4,
// })

// let x1 = 10;
// let y1 = 10;
// let x2 = 50;
// let y2 = 50;

// function getAnimation() {
//   context.fillStyle = 'black';
//   context.clearRect(0, 0, 500, 500)
//   context.fillRect(x1, y1, x2, y2);
// }

// const play = () => {
//   getAnimation()
//   x1 = x1 + 5;
//   requestAnimationFrame(play);
// }

// play();

// setInterval(()=>{
//   animation()
//   x1 = x1 + 5;
// }, 200)

// for(let i = 1; i < 6; i++) {
//   animation()
//   x1 = x1 + 55;
//   // y1 = y1 + 50;
// }
