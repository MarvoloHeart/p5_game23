let state = 1;  
let message = "Start";
let spaceImage;
let spaceBack; 
let score = 0; 
let myXPos = 225;
let myYPos = 445;

let yPos = (100);
let xPos = (100); 

let ship;
let aliens = []; // array of aliens
let lasers = []; // array of lasers
let points = 0;



function setup() {
    createCanvas(500, 500);
    frameRate(10);
    ship = new Ship(); 
    imageMode(CENTER); 
    //create the bottom row of aliens
    let startX = 65;
    let startY = 80;
    for (let i = 0; i < 6; i++){
        aliens[i] = new Alien(i * startX + 80, startY, alien1a, alien1b, 5);
    }
    //create top row of aliens
    startY = 40; 
    let offset = 0; 
    for (let j = 6; j < 12; j++){
        aliens[j] = new Alien(offset * startX + 80, startY, alien2a, alien2b, 10);
        offset++; 
    }
    // console.log(aliens);
}

function preload(){
    spaceImage = loadImage("images/Space.jpg");
    alien1a = loadImage("images/alien1a.png"); 
    alien1b = loadImage("images/alien1b.png"); 
    alien2a = loadImage("images/alien2a.png"); 
    alien2b = loadImage("images/alien2b.png"); 
    spaceBack = loadImage("images/space_back.png"); 

}

function draw() {

    if (state == 1){
        background(255, 0, 0);
        image(spaceImage, 0, 0, 1000, 1000);
        stroke(0) 
        strokeWeight(10)
        fill(150, 0, 255, 255)
        rect(150, 200, 200, 100)
        fill(255);
        stroke(0, 0, 0) 
        strokeWeight(10)
        textSize(50);
        text(message, 195, 265);
        


    }
    if (state == 2){
    background(0, 0, 0);
    image(spaceBack, 0, 0, 1000, 1000);
    ship.show(); 
    ship.move();
    //show and move aliens
    let edge = false; 
    for(let i = 0; i < aliens.length; i++) {
        aliens[i].show(); 
        aliens[i].move(); 
        if (aliens [i].x > width || aliens[i].x < 0) {
            edge = true; 
        }
    }
    if (edge) {
        for ( let k = 0; k < aliens.length; k++){
            aliens[k].shiftDown();
        }
    }
//display and move the laser
for(let las = 0; las < lasers.length; las++){
    lasers[las].show(); 
    lasers[las].move(); 
    // collision detection 
    for (let j = 0; j < aliens.length; j ++) {
        if (lasers[las].hits(aliens[j])) {
            lasers[las].remove(); 
            points = points + aliens[j].pts; 
            aliens.splice(j, 1); // remove alien from the array
        }
    } // end of alien loop
} // end of laser loop #1

// loop through lasers; remove lasers with flag
for(let z = lasers.length - 1; z >= 0; z--){
    if(lasers[z].toDelete) {
        lasers.splice(z, 1); // remove laser from array
    }
} // end of laser loop #2
updateHUD(); 
//check if game is over
if (aliens.length <= 0) {
    gameOver(); 
}
}// end of state2

    
}// end of draw function






function mouseClicked() {
if (mouseX > 150 && mouseX < 350 && mouseY > 200 && mouseY < 300) {
    state = 2
}
}

// key event handlers
function keyReleased() {
    ship.setDir(0);
}

function keyPressed() {
    if(key === " ") {
        let laser = new Laser(ship.x + (ship.width/2), ship.y);
        lasers.push(laser); 
    }
    if(keyCode === RIGHT_ARROW){
        ship.setDir(1);
    } else if(keyCode === LEFT_ARROW) {
        ship.setDir(-1);
    }
    
}

function updateHUD() {
    fill(255);
    text("Score: " + points, 10 , 20);
    textSize(10);
    text("Aliens Remaining: " + aliens.length, 70, 20);
    textSize(10);
}

function gameOver() {
    background(0); 
    fill(0, 255, 0);
    textSize(72); 
    textAlign(CENTER); 
    text("Game Over", width / 2, height / 2);
    noLoop();
}



















































































// let score = 0
// let myXPos = 100;
// let myYPos = 100;

// let enemyXPos = 300;
// let enemyYPos = 300; 

// let myLeft, myRight, myTop, myBottom; 

// let enemyLeft, enemyRight, enemyTop, enemyBottom;

// // function preload(){
// //     mushroomImage = loadImage("images/mushroom.png");
// //     questionImage = loadImage("images/question.png");
// // }



// function setup() {
//     createCanvas(500, 500);
//     noStroke();
 
 
//     rectMode(CENTER);
//  }
 
 
//  function draw() {
//     background(0);
    
//     fill(0, 0, 255);
//     rect(enemyXPos, enemyYPos, 50, 50);
    
//     fill(255, 0, 0);
//     rect(myXPos, myYPos, 50, 50);

//     // image(mushroomImage, myXPos, myYPos, 50, 50);
//     // image(questionImage, enemyXPos, enemyYPos, 50, 50);


//     if(keyIsDown(LEFT_ARROW)){
//         myXPos -= 3; 

//     }

//     if(keyIsDown(RIGHT_ARROW)){
//         myXPos += 3; 
//     }

//     if(keyIsDown(DOWN_ARROW)){
//         myYPos += 3;
//     }

//     if(keyIsDown(UP_ARROW)){
//         myYPos -= 3;
//     }

//     myLeft = myXPos - 25; 
//     myRight = myXPos + 25;
//     myTop = myYPos - 25;
//     myBottom = myYPos + 25; 

//     enemyLeft = enemyXPos - 25;
//     enemyRight = enemyXPos + 25;
//     enemyTop = enemyYPos - 25;
//     enemyBottom = enemyYPos + 25;

//     fill(random(255), random(255), random(255));
//     textSize(22);
//     text("Score:" + score, 140, 480);



//     if(myLeft > enemyRight || myRight < enemyLeft || myTop > enemyBottom || myBottom < enemyTop){

//     }

//     else {
//         enemyXPos = random(0, 500)
//         enemyYPos = random(0, 500)
//         score += 1
//     }

//  }