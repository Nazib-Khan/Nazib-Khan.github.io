// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDLGh7gHQ2HbJkPcJWKnYzPMe59_tDhlYo",
    authDomain: "circle-scoreboard.firebaseapp.com",
    databaseURL: "https://circle-scoreboard.firebaseio.com",
    projectId: "circle-scoreboard",
    storageBucket: "circle-scoreboard.appspot.com",
    messagingSenderId: "859343718392",
    appId: "1:859343718392:web:46420690778c80a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()  
let scoreboard = { }
let Jimin = document.getElementById("park")
let enemyRadius
let points
let direction_h
let direction_v
let directtion_h2
let direction_v2
let level
let blueScore
let purple
let time
let x
let y
let o 
let j
let e 
let f

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = width/945
  x = 400
  y = 300
  e = 200
  f = 300
  j = [100,50,300,120]
  o = [390,200,80,18]
  direction_h=1
  direction_v=1
  direction_h2=[1,1,1,1]
  direction_v2=[1,1,1,1]
  points=0
  enemyRadius=16
  level = 1
  blueScore=11
  purple=4
  time=120
}

function draw() {
  if(time >-2){
  background(191,227,255);
  fill(22,195,255);
  circle(x*s,y,40*s);
  fill(246, 34, 23);
  circle(e*s,f,25*s)
  x=x+8*direction_h
  y=y+blueScore*direction_v  
  text("Points:"+points,50,50)
  text("Time:"+time.toFixed(1),50,75)
  time = time-.02
  
  if(keyIsDown(LEFT_ARROW)){
    e = e-10
  }
  
  if(keyIsDown(RIGHT_ARROW)){
    e = e+10
  }
  
  if(keyIsDown(UP_ARROW)){
    f = f-10
  }
  
  if(keyIsDown(DOWN_ARROW)){
    f = f+10
  }
  if ( x*s > width || x*s<0) {
    direction_h = direction_h*-1
  }
  if ( y > height || y<0) {
	direction_v = direction_v*-1
  }
  if(dist(x,y,e,f)<36*s+25*s){
      points=points+1
    }  
  
  for(i=0; i<purple; i=i+1){
    fill(128, 0, 197);
    circle(j[i]*s,o[i],enemyRadius*s);
    j[i]=j[i]+14*direction_h2[i]
    o[i]=o[i]-20*direction_v2[i]

    if ( j[i]*s > width || j[i]*s<0) {
      direction_h2[i] = direction_h2[i]*-1
    }
    if ( o[i] > height || o[i]<0) {
      direction_v2[i] = direction_v2[i]*-1
    }
    if(dist(j[i]*s,o[i],e*s,f)<enemyRadius*s+25*s){
      points=points-4
    }
    if (points > 100 && level == 1) {
      enemyRadius = enemyRadius + 10
      level = 2
    }
    
    if (points > 200 && level == 2) {
      blueScore = blueScore + 8
      level = 3
    }
    
    if (points > 300 && level == 3) {
      direction_h2=[1,-1,1,-1,1,-1,1]
      direction_v2=[-1,1,-1,1,1,1,-1] 
      level = 4
    }
    if (points > 350 && level == 4) {
      purple = purple + 3
      level = 5
      j.push.apply(j,[400,299,200])
      o.push.apply(o,[100,400,399])
    }
    if (touches.length == 0)   {

    }
    else { 
		e = touches[0].x
		f = touches[0].y
     }
	  
  } 
    
    textSize(30)
}
  else{
    park.innerHTML= "Name? <input id=Mantis><button onclick='restart()'>Restart</button><button onclick=generate_alltime_leaderboard()>'All-time leaderboard'</button>"
    noLoop()
  }

}
function restart() {
  let Mantis = document.getElementById("Mantis")
  name = Mantis.value
  database.ref(name).set(points)
  if (name !="") {
    scoreboard[name] = points
  }
  alert("scoreboard:"+JSON.stringify(scoreboard,null,1))
  time=120
  points=0
  loop()
  park.innerHTML=""
  generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i< 6; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
