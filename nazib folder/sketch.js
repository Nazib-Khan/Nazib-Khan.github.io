let x = 220
let y = 400
let a = 210
let b = 350
let c = [170,270,370,470,250]
let d = [100,390,650,550,150]
let points = 5
let enemies = 3
let level = 1
let time = 60

function setup() {
  createCanvas(windowWidth, windowHeight, );
}

function draw() {
  background(150,0,0);
  fill(140,50,120)
  circle(x,y,110) //"good"
  x = x + 5
  if (x > width) {
    x = 0 
  }
  
  fill(110,70,40)
  circle(a,b,45)
  if (keyIsDown(LEFT_ARROW)) {
    a = a - 7
  }
  if (keyIsDown(RIGHT_ARROW)) {
    a = a + 7
  }
   if (keyIsDown(UP_ARROW)) {
    b = b - 7
  }
   if (keyIsDown(DOWN_ARROW)) {
    b = b + 7
  }
  
  
  

  fill(210,30,115)
  for (i=0; i<enemies; i=i+1) {
    circle(c[i],d[i],95)  //"bad"
    c[i] = c [i]+  5
    if (c[i] > width) {
      c[i] = 0 
    }

   if (dist( a, b,c[i],d[i]) < 35 + 95) {
      points = points - 1
    }
  }
  
  if (points > 100 && level == 1) {
      enemies = enemies + 1
      level = 2
  }
  
  if (points > 150 && level == 2) {
    enemies = enemies + 1
    level = 3
  }
  
  textSize(25)
text("points: " + points,90,50) 
  text ("time: " + time, 100, 75)
  time = time - 1
 if (dist( x, y,a, b) < 45 + 90) {
	points = points + 1
}
 
  textSize(25)


}