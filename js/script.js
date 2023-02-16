//-------------------------Declarations variables
let mario = document.getElementById("perso");
let marioMoveBy = 50;
let goombaMoveBy = 70;
let piece = document.getElementById("piece");
let score = document.getElementById("score");
let compteurScore = 0;
let gameOver = document.getElementById("gameover");
let goomba = document.getElementById("goomba");
let timer = document.getElementById("secondes");
let sonPiece = document.getElementById("son piece");
let sonGameOver = document.getElementById("son gameover");
let sonGoomba = document.getElementById("son goomba");
let musiqueMario = document.getElementById("musique mario");
let invincible = false;

//---------------------Déplacer Mario avec les flèches

window.addEventListener("load", () => {
  mario.style.position = "absolute";
  mario.style.left = window.innerWidth / 3 + "px";
  mario.style.top = window.innerHeight / 3 + "px";
});

//console.log("top initial" + mario.style.top);

window.addEventListener("keydown", (event) => {
  //console.log(mario.style.top);
  switch (event.key) {
    case "ArrowDown":
      mario.style.top = parseInt(mario.style.top) + marioMoveBy + "px";
      collision();
      collisionGoomba();
      reboundMario();
      break;
    case "ArrowUp":
      mario.style.top = parseInt(mario.style.top) - marioMoveBy + "px";
      collision();
      collisionGoomba();
      reboundMario();
      break;
    case "ArrowLeft":
      mario.style.left = parseInt(mario.style.left) - marioMoveBy + "px";
      collision();
      collisionGoomba();
      reboundMario();
      break;
    case "ArrowRight":
      mario.style.left = parseInt(mario.style.left) + marioMoveBy + "px";
      collision();
      collisionGoomba();
      reboundMario();
      break;
  }
  //   console.log(mario.style.top);
  //   console.log(mario.style.left);
});

function reboundMario() {
  let horizontalPosition = parseInt(mario.style.left);
  let verticalPosition = parseInt(mario.style.top);
  // console.log("hori " + horizontalPosition);
  // console.log("verti " + verticalPosition);
  // console.log("width " + window.innerWidth);
  // console.log("height " + window.innerHeight);

  if (verticalPosition >= window.innerHeight - 80) {
    mario.style.top = parseInt(mario.style.top) - marioMoveBy + "px";
    //console.log("rebond bas");
  }
  if (verticalPosition <= -10) {
    mario.style.top = parseInt(mario.style.top) + marioMoveBy + "px";
    // console.log("rebond haut");
  }
  if (horizontalPosition >= window.innerWidth - 60) {
    mario.style.left = parseInt(mario.style.left) - marioMoveBy + "px";
    // console.log("rebond droit");
  }
  if (horizontalPosition <= 0) {
    mario.style.left = parseInt(mario.style.left) + marioMoveBy + "px";
    //console.log("rebond gauche");
  }
}

//--------------------Défini la position de la pièce

function movePiece() {
  let min = 5;
  let max = 95;
  piece.style.position = "absolute";
  piece.style.top = Math.random() * (max - min) + min + "%";
  piece.style.left = Math.random() * (max - min) + min + "%";

  //   console.log(piece.style.top);
  //   console.log(piece.style.left);
}

//------------------Fait bouger la pièce toutes les 3 secondes
setInterval(movePiece, 3000);

//------------------Detecter la collision avec la pièce

function collision() {
  let mario2 = mario.getBoundingClientRect();
  //console.log(mario2);

  let piece2 = piece.getBoundingClientRect();
  //console.log(piece2);

  if (
    mario2.x < piece2.x + piece2.width &&
    mario2.x + mario2.width > piece2.x &&
    mario2.y < piece2.y + piece2.height &&
    mario2.height + mario2.y > piece2.y
  ) {
    movePiece();
    addScore();
    sonPiece.play();
    //console.log("collision");
  } else {
    //console.log("no collision");
  }
}

//--------------------Changer le score

function addScore() {
  compteurScore += 1;
  score.innerText = "Score : " + compteurScore;
  //console.log("score :" + score);
}

function removeScore() {
  compteurScore += -1;
  score.innerText = "Score : " + compteurScore;
  //console.log("score :" + score);
}

//----------------------Timer

let countDown = 30;

function timing() {
  countDown -= 1;
  timer.innerText = "Temps restant : " + countDown + " s";
  if (countDown > 1) {
    musiqueMario.play();
  }
  if (countDown == 0) {
    timer.innerText = "Temps restant : 0 s ";
    appearGameOver();
    sonGameOver.play();
  } else if (countDown < 0) {
    timer.innerText = "Temps restant : 0 s ";
    appearGameOver();
    piece.remove();
    mario.remove();
    goomba.remove();
  }
}

setInterval(timing, 1000);

// window.addEventListener("load", timing);

//-------------------------fin de partie

window.addEventListener("load", () => {
  gameOver.style.display = "None";
});

function appearGameOver() {
  gameOver.style.display = "block";
}

//-------------------------Mouvement Goomba

window.addEventListener("load", () => {
  goomba.style.position = "absolute";
  // goomba.style.left = "50%";
  // goomba.style.top = "50%";
  goomba.style.top = window.innerHeight / 2 + "px";
  goomba.style.left = window.innerWidth / 2 + "px";
});

let randomNumber;

function moveGoomba() {
  randomNumber = Math.floor(Math.random() * 4) + 1;
  //randomNumber = 3;
  //console.log(randomNumber);

  switch (randomNumber) {
    case 1:
      goomba.style.top = parseInt(goomba.style.top) + goombaMoveBy + "px";
      setInterval(collisionGoomba, 1000);
      rebound();
      //console.log("Down");
      break;
    case 2:
      goomba.style.top = parseInt(goomba.style.top) - goombaMoveBy + "px";
      setInterval(collisionGoomba, 1000);
      rebound();
      //console.log("Up");
      break;
    case 3:
      goomba.style.left = parseInt(goomba.style.left) - goombaMoveBy + "px";
      setInterval(collisionGoomba, 1000);
      rebound();
      //console.log("Left");
      break;
    case 4:
      goomba.style.left = parseInt(goomba.style.left) + goombaMoveBy + "px";
      setInterval(collisionGoomba, 1000);
      rebound();
    //console.log("Right");
    default:
      //console.log("rien");
      break;
  }
}
setInterval(moveGoomba, 500);

function rebound() {
  let horizontalPosition = parseInt(goomba.style.left);
  let verticalPosition = parseInt(goomba.style.top);
  // console.log("hori " + horizontalPosition);
  // console.log("verti " + verticalPosition);
  // console.log("width " + window.innerWidth);
  // console.log("height " + window.innerHeight);

  if (verticalPosition >= window.innerHeight - 80) {
    goomba.style.top = parseInt(goomba.style.top) - goombaMoveBy + "px";
    //console.log("rebond haut");
  }
  if (verticalPosition <= 0) {
    goomba.style.top = parseInt(goomba.style.top) + goombaMoveBy + "px";
    // console.log("rebond bas");
  }
  if (horizontalPosition >= window.innerWidth - 50) {
    goomba.style.left = parseInt(goomba.style.left) - goombaMoveBy + "px";
    // console.log("rebond droit");
  }
  if (horizontalPosition <= 0) {
    goomba.style.left = parseInt(goomba.style.left) + goombaMoveBy + "px";
    //console.log("rebond gauche");
  }
}

//setInterval(rebound, 10);

//-------------------------Collision Goomba
function collisionGoomba() {
  if (!invincible) {
    let mario3 = mario.getBoundingClientRect();
    //console.log(mario3);

    let goomba2 = goomba.getBoundingClientRect();
    //console.log(goomba2);

    if (
      mario3.x < goomba2.x + goomba2.width &&
      mario3.x + mario3.width > goomba2.x &&
      mario3.y < goomba2.y + goomba2.height &&
      mario3.height + mario3.y > goomba2.y
    ) {
      removeScore();
      moveGoomba();
      sonGoomba.play();
      brillance();
      setTimeout(brillance2, 500);
      setTimeout(brillance, 500);
      setTimeout(brillance2, 500);
      invincible = true;
      setTimeout(vulnerable, 500);

      //console.log("collision");
    } else {
      //console.log("no collision");
    }
  } else {
  }
}

function brillance() {
  mario.style.filter = "brightness(1.75)";
}

function brillance2() {
  mario.style.filter = "brightness(1)";
}

function vulnerable() {
  invincible = false;
}
