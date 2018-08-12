
function game ()
{
// PRELOADING

  let goalSound = new Audio("assets/audio/airhorn.mp3"),
      boostAudio = new Audio("assets/audio/boost_sound.wav"),
      carAudio = new Audio("assets/audio/car_engine.wav"),
      carAudio2 = new Audio("assets/audio/car_engine_2.wav"),
      backgroundAudio = new Audio("assets/audio/arcade_music.wav"),
      jumpAudio = new Audio("assets/audio/jump.wav");

  carAudio.volume = 0.1;
  carAudio.volume = 0.1;

  var boostImg = new Image();
  boostImg.src = "assets/graphics/boost.png";


  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;



  // module aliases
  var Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      Vertices = Matter.Vertices;

  // create an engine
  var engine = Engine.create();
  engine.world.gravity.y = 0.2;

  // create a renderer
  var render = Render.create
  ({
    //element: canvas,
    element: document.body,
    canvas: canvas,
    engine: engine,
    options:
    {
      //width: 100,
      //height: 100,
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: true,
      background: "assets/graphics/grid_background_widescreen.png",
      hasBounds: false
    }
  });


////////////////////////////////////////////////////////////////////////////////
//     TEST
////////////////////////////////////////////////////////////////////////////////
/*
var VIEW = {};
VIEW.SAFE_WIDTH = 100;
VIEW.SAFE_HEIGHT = 100;
VIEW.scale = Math.min(window.innerWidth / VIEW.SAFE_WIDTH, window.innerHeight / VIEW.SAFE_HEIGHT);
VIEW.width = window.innerWidth / VIEW.scale;
VIEW.height = window.innerHeight / VIEW.scale;
VIEW.centerX = VIEW.width / 2;
VIEW.centerY = VIEW.height / 2;
VIEW.offsetX = (VIEW.width - VIEW.SAFE_WIDTH) / 2 / VIEW.scale;
VIEW.offsetY = (VIEW.height - VIEW.SAFE_HEIGHT) / 2 / VIEW.scale;

var bodiesDom = document.querySelectorAll('.block');
var bodies = [];
for (var i = 0, l = bodiesDom.length; i < l; i++) {
    var body = Bodies.rectangle(
        VIEW.centerX,
        20,
        VIEW.width*bodiesDom[i].offsetWidth/window.innerWidth,
        VIEW.height*bodiesDom[i].offsetHeight/window.innerHeight
    );
	bodiesDom[i].id = body.id;
    bodies.push(body);
}
World.add(engine.world, bodies);


*/
////////////////////////////////////////////////////////////////////////////////
//     BALL
////////////////////////////////////////////////////////////////////////////////



  var ball = Bodies.circle(window.innerWidth/2, window.innerHeight/2, 30,
    {
      mass: 10,// Used to be 0.5
      inertia: 0,
      restitution: 0.95,
      friction: 0,
      frictionAir: 0.02,
      render: {sprite: {texture: "assets/graphics/football.png", xScale: 0.09, yScale: 0.09}}
    });



////////////////////////////////////////////////////////////////////////////////
//     WALLS
////////////////////////////////////////////////////////////////////////////////

var offset = 1;
var wallSize = 50;

    var roof = Bodies.rectangle(window.innerWidth/2, wallSize/2, window.innerWidth, wallSize,
      {
        isStatic: true
      });

    var floor = Bodies.rectangle(window.innerWidth/2, window.innerHeight - wallSize, window.innerWidth, wallSize,
      {
        isStatic: true,
        friction: 0,
        opacity: 0,
        visible: false,
        render: {fillStyle: "black"}
        //render: {sprite: {texture: "transparent.png"}}
      });

    var rightWall = Bodies.rectangle(window.innerWidth - 60, 0, wallSize, window.innerHeight*2,
    {
      isStatic: true,
      //render: {sprite: {texture: "transparent.png"}}
    });

    var leftWall = Bodies.rectangle(30, 0, wallSize, window.innerHeight *2,
    {
      isStatic: true
    });




////////////////////////////////////////////////////////////////////////////////
//     GOALS
////////////////////////////////////////////////////////////////////////////////

    var leftGoalStartPoint = [window.innerWidth/7, 200],
        goalHeight = 150,
        goalWidth = 50,
        barWidth = 20;

    var leftGoalTop = Bodies.rectangle(leftGoalStartPoint[0], leftGoalStartPoint[1], goalWidth, barWidth,
    {
      isStatic: true
    });

    var leftGoalBottom = Bodies.rectangle(leftGoalStartPoint[0], leftGoalStartPoint[1] + goalHeight, goalWidth, barWidth,
    {
      isStatic: true
    });

    var leftGoalBack = Bodies.rectangle(leftGoalStartPoint[0] - goalWidth/2 , leftGoalStartPoint[1] + goalHeight/2, barWidth, goalHeight + barWidth,
    {
      isStatic: true
    });

    var leftGoal = Body.create
    ({
      parts: [leftGoalTop, leftGoalBottom, leftGoalBack],
      inertia: 100000,
      friction: 0,
      mass: 100,
      isStatic: true,
      //frictionStatic: 0.5,
      restitution: -1,
      //sleepThreshold: Infinity,
      //collisionFilter: {group: -2},
    });




    var rightGoalStartPoint = [window.innerWidth, 200];
    var testBox = Bodies.rectangle(500, 200, 20, 20,{isStatic: true});


    var rightGoalTop = Bodies.rectangle(rightGoalStartPoint[0], rightGoalStartPoint[1], goalWidth, barWidth,
    {
      isStatic: true
    });

    var rightGoalBottom = Bodies.rectangle(rightGoalStartPoint[0], rightGoalStartPoint[1] + goalHeight, goalWidth, barWidth,
    {
      isStatic: true
    });

    var rightGoalBack = Bodies.rectangle(rightGoalStartPoint[0] + goalWidth/2 , rightGoalStartPoint[1] + goalHeight/2, barWidth, goalHeight + barWidth,
    {
      isStatic: true
    });

    var rightGoal = Body.create
    ({
      parts: [rightGoalTop, rightGoalBottom, rightGoalBack],
      inertia: 100000,
      friction: 0,
      mass: 100,
      isStatic: true,
      //frictionStatic: 0.5,
      restitution: -1,
      //sleepThreshold: Infinity,
      //collisionFilter: {group: -2},
    });


    /*
    console.log("window height: " + window.innerHeight);
    console.log("window width: " + window.innerWidth);


    console.log("window width/7: " + window.innerWidth/7);
    console.log("6*window width/7: " + 6*window.innerWidth/7);
    */

    console.log("left goal Pos: " + leftGoal.position.x);
    console.log("right goal Pos: " + rightGoal.position.x);









////////////////////////////////////////////////////////////////////////////////
//     CARS
////////////////////////////////////////////////////////////////////////////////

var carStartPoint = [200, 350],
    carWidth = 30,
    carHeight = carWidth/3,
    wheelRadius = carHeight/2,
    carVertices =
    [
      {x : carStartPoint[0] ,           y : carStartPoint[0]},
      {x : carStartPoint[0]+carWidth ,  y : carStartPoint[0]+(carHeight/2)},
      {x : carStartPoint[0]+carWidth ,  y : carStartPoint[0]+carHeight},
      {x : carStartPoint[0] ,           y : carStartPoint[0]+carHeight}
    ];

const carBody = Matter.Bodies.fromVertices(carStartPoint[0], carStartPoint[1], carVertices);
const frontWheel = Matter.Bodies.circle(carBody.position.x - carWidth/3, carBody.position.y +(3*carHeight/4), wheelRadius);
const rearWheel = Matter.Bodies.circle(carBody.position.x + carWidth/3, carBody.position.y +(3*carHeight/4), wheelRadius);
const refBL = Matter.Bodies.circle(carBody.position.x - carWidth/2, carBody.position.y + carHeight/2, 0.01);
const refTL = Matter.Bodies.circle(carBody.position.x - carWidth/2, carBody.position.y - carHeight/2, 0.01);
const car = Body.create
({
  parts: [carBody, frontWheel, rearWheel, refBL, refTL],
  inertia: 100000,
  friction: 0,
  mass: 100,
  //frictionStatic: 0.5,
  restitution: -1
  //sleepThreshold: Infinity,
  //collisionFilter: {group: -2},
});



//**********************************************************************************
// PLAYER 2

var carWidth2 = 60,
    carHeight2 = 20;
const carBody2 = Matter.Bodies.fromVertices(1050, 350, [{x:200, y:200},{x:140, y:210},{x:140, y:220},{x: 200, y: 220}],
  {
    render: {sprite: {texture: "assets/graphics/transparent.png", xScale: 0.09, yScale: 0.09}}
  });
  const frontWheel2 = Matter.Bodies.circle(carBody2.position.x -20, carBody2.position.y +15, 8,
  {
    render: {sprite: {texture: "assets/graphics/transparent.png", xScale: 0.09, yScale: 0.09}}
  });
  const rearWheel2 = Matter.Bodies.circle(carBody2.position.x +20, carBody2.position.y +15, 8,
  {
    render: {sprite: {texture: "assets/graphics/transparent.png", xScale: 0.09, yScale: 0.09}}
  });
const refBR = Matter.Bodies.circle(carBody2.position.x + carWidth2/2, carBody2.position.y + carHeight2/2, 0.01,
{
  render: {sprite: {texture: "assets/graphics/transparent.png", xScale: 0.09, yScale: 0.09}}
});
const refTR = Matter.Bodies.circle(carBody2.position.x + carWidth2/2, carBody2.position.y - carHeight2/2, 0.01,
{
  render: {sprite: {texture: "assets/graphics/transparent.png", xScale: 0.09, yScale: 0.09}}
});
const car2 = Body.create
({
  parts: [carBody2, frontWheel2, rearWheel2, refBR, refTR],
  inertia: 100000,
  friction: 0,
  mass: 100,
  //frictionStatic: 0.5,
  restitution: -1
  //sleepThreshold: Infinity,
  //collisionFilter: {group: -2},
});




var carOnGround = true,
    carPositionX = car.position.x,
    carPositionY = car.position.y,
    carAngleRadians = 0;
    carAngleDegrees = 0;
    carAngleRadians2 = 0; // Player 2
    carAngleDegrees2 = 0; // Player 2
    carAvailableJumps = 2,
    carAvailableJumps2 = 2; // Player 2
    carDriveForce = 0.001 * car.mass,
    carJumpForce = -0.008 * car.mass,
    carFlipForce = 0.003 * car.mass,
    carAirRotationalForce = 0.0004 * car.mass,
    carBoostForce = 0.0009 * car.mass,
    carMaxSpeedOnGround = 6;





  // Add all of the bodies to the world
  World.add(engine.world, [car, car2, ball, floor, roof, leftWall, rightWall, leftGoal, rightGoal, testBox]);



  // Key definitions
  const KEY_W = 87;
  const KEY_A = 65;
  const KEY_S = 83;
  const KEY_D = 68;
  const KEY_SPACE = 32;
  const KEY_SHIFT = 16;
  const KEY_I = 73;
  const KEY_J = 74;
  const KEY_K = 75;
  const KEY_L = 76;

  var keys = {
    87: false,
    65: false,
    83: false,
    68: false,
    32: false,
    16: false,
    73: false,
    74: false,
    75: false,
    76: false

  };


  document.addEventListener('keydown', function(event)
  {
    if(event.keyCode in keys)
    {
      keys[event.keyCode] = true;
    }
  });

  document.addEventListener('keyup', function(event)
  {
    if(event.keyCode in keys)
    {
      keys[event.keyCode] = false;
    }
  });


/////////////////////////////// CONTROLS
function controls()
{
  if(onGround())
  {
    // w jump up       - momentary
    if(keys["87"]) // KEY_W
    {
      carAvailableJumps--;
      Body.applyForce(car,car.position,{x:0,y:carJumpForce});
      //Body.setAngularVelocity(car, Math.PI/6); // Good for flipping
    }


    // a go left       - continued
    if(keys["65"]) // KEY_A
    {
      if(car.speed < carMaxSpeedOnGround)
      {
        //Body.applyForce( car, {x: car.position.x, y: car.position.y}, {x: 0.5, y: 0})
        Body.applyForce(car,car.position,{x:-carDriveForce,y:0});
        //console.log("Car Speed: " + car.speed);
      }
    }


    // s boost         - continued
    if(keys["83"]) // KEY_S
    {
      Body.applyForce(car,car.position, {x:carBoostForce, y: 1});
    }


    // d go right      - continued
    if(keys["68"]) // KEY_D
    {
      if(car.speed < carMaxSpeedOnGround)
      {
        //Body.applyForce( car, {x: car.position.x, y: car.position.y}, {x: 0.5, y: 0})
        Body.applyForce(car,car.position,{x:carDriveForce,y:0});
        //console.log("Car Speed: " + car.speed);
      }
    }
  }
  else
  {
    // a rotate left   - continued
    if(keys["65"]) // KEY_A
    {
      let rotationalForce = 0.003;
      Body.applyForce(car,
        { x: (car.position.x - carWidth/2), y: (car.position.y) },
        { x:0, y:carAirRotationalForce } );
    }


    // s boost         - continued
    if(keys["83"]) // KEY_S
    {
      Body.applyForce(car,car.position,
        {
          x: carBoostForce * Math.cos(carAngleRadians),
          y: carBoostForce * Math.sin(carAngleRadians)
        });
    }


    // d rotate right  - continued
    if(keys["68"])
    {
      let rotationalForce = 0.003;
      Body.applyForce(car,
        { x: (car.position.x - carWidth/2), y: (car.position.y) },
        { x:0, y:-carAirRotationalForce } );
    }


    if(carAvailableJumps > 0)
    {
      // w jump up       - momentary {jump     if holding a or d, flip}
      if(keys["87"]) // KEY_W
      {
          carAvailableJumps--;
          Body.applyForce(car,car.position,{x:0,y:carJumpForce});
      }
    }
  }
}




//*******************************************************************************
// PLAYER 2 CONTROLS

function controls2()
{
  if(onGround2())
  {
    // w jump up       - momentary
    if(keys["73"]) // KEY_I
    {
      carAvailableJumps2--;
      Body.applyForce(car2,car2.position,{x:0,y:carJumpForce});
      //Body.setAngularVelocity(car, Math.PI/6); // Good for flipping
    }


    // a go left       - continued
    if(keys["74"]) // KEY_J
    {
      if(car2.speed < carMaxSpeedOnGround)
      {
        //Body.applyForce( car, {x: car.position.x, y: car.position.y}, {x: 0.5, y: 0})
        Body.applyForce(car2,car2.position,{x:-carDriveForce,y:0});
        //console.log("Car Speed: " + car.speed);
      }
    }


    // s boost         - continued
    if(keys["75"]) // KEY_K
    {
      Body.applyForce(car2,car2.position, {x:-carBoostForce, y: 1});
    }


    // d go right      - continued
    if(keys["76"]) // KEY_L
    {
      if(car2.speed < carMaxSpeedOnGround)
      {
        //Body.applyForce( car, {x: car.position.x, y: car.position.y}, {x: 0.5, y: 0})
        Body.applyForce(car2,car2.position,{x:carDriveForce,y:0});
        //console.log("Car Speed: " + car.speed);
      }
    }
  }
  else
  {
    // a rotate left   - continued
    if(keys["74"]) // KEY_J
    {
      Body.applyForce(car2,
        { x: (car2.position.x + carWidth2/2), y: (car2.position.y) },
        { x:0, y:-carAirRotationalForce } );
    }


    // s boost         - continued
    if(keys["75"]) // KEY_K
    {
      Body.applyForce(car2,car2.position,
        {
          x: -carBoostForce * Math.cos(carAngleRadians2),
          y: -carBoostForce * Math.sin(carAngleRadians2)
        });
    }


    // d rotate right  - continued
    if(keys["76"]) // KEY_L
    {
      Body.applyForce(car2,
        { x: (car2.position.x - carWidth2/2), y: (car2.position.y) },
        { x:0, y:-carAirRotationalForce } );
    }


    if(carAvailableJumps2 > 0)
    {
      // w jump up       - momentary {jump     if holding a or d, flip}
      if(keys["73"]) // KEY_I
      {
          carAvailableJumps2--;
          Body.applyForce(car2,car2.position,{x:0,y:carJumpForce});
      }
    }
  }
}



//*******************************************************************************

var groundClearance = 5;
function onGround()
{
  //Rear: 471.9451171491292
  //Front: 471.8888231332251
  if(frontWheel.position.y > (548 - wallSize/2 - wheelRadius - groundClearance) && rearWheel.position.y > (548 - wallSize/2 - wheelRadius - groundClearance))
  {
    carAvailableJumps = 1;
    return true;
  }
  else
  {
    return false;
  }
}

console.log("ground position: " + floor.position.y);
function onGround2()
{
  //Rear: 471.9451171491292
  //Front: 471.8888231332251
  if(frontWheel2.position.y > 465 && rearWheel2.position.y > 465)
  {
    carAvailableJumps2 = 1;
    return true;
  }
  else
  {
    return false;
  }
}


function calculateAngle()
{
  var dy = (refBL.position.y - refTL.position.y);
  var dx = (refTL.position.x - refBL.position.x);
  var theta = Math.atan2(dx,dy);

  carAngleRadians = theta;
  carAngleDegrees = 180 + (theta * 180/Math.PI);
}


function calculateAngle2()
{
  var dy = (refBR.position.y - refTR.position.y);
  var dx = (refTR.position.x - refBR.position.x);
  var theta = Math.atan2(dx,dy);

  carAngleRadians2 = theta;
  carAngleDegrees2 = 180 + (theta * 180/Math.PI);
}


function bricks()
{
  for(i=0; i<20; i++)
  {
    drawSprite("floor_1", 60, 60, "assets/graphics/bricks.png", 10 +(i*60), 480, 0);
  }
  drawSprite("floor_1", 30, 60, "assets/graphics/bricks.png", 10 +(20*60), 480, 0);
}



//////////////////////////////////////////////////////// AUDIO
function playSounds(backgroundAudio, carAudio)
{
  backgroundAudio.play();
  carAudio.play();

  if(keys["75"] || keys["83"])
  {
    boostAudio.play();
  }
  else
  {
    boostAudio.pause();
  }

  if(onGround() || onGround2())
  {
    if(keys["65"] || keys["68"] || keys["74"] || keys["76"])
    {
      carAudio2.play();
    }
    else
    {
      carAudio2.pause();
    }
  }
  else
  {
    carAudio2.pause();
  }
}


///////////////////////////////////////// ANIMATIONS AND SPRITES
currentFrame = 0;
function playAnimations(posX, posY, srcX, srcY, centreOfRotX, centreOfRotY, sheetWidth, sheetHeight,
                        columns, rows, rotation, name, source)
{
  console.log("playAnimations() STARTED");
  name = new Image();
  name.src = source;

  var width = sheetWidth/columns,
      height = sheetHeight/rows;

  currentFrame = ++currentFrame % cols;
  srcX = currentFrame * width;
  srcY = 0;

  context.translate(centreOfRotX, centreOfRotY);
  context.rotate((rotation + 180) * Math.PI / 180);
  //context.drawImage(name, srcX, srcY, width, height, posX, posY, width, height);
  drawSprite(name, width, height, source, posX, posY, rotation, centreOfRotX, centreOfRotY);
  context.rotate(-(rotation + 180) * Math.PI / 180);
  context.translate(-centreOfRotX, -centreOfRotY);

  //context.drawImage(boostImg, srcX, srcY, width, height, x, y, width, height);
  //drawSprite(name, width, height, source, posX, posY, rotation)

  console.log("playAnimations() FINISHED");
}
//setInterval(function(){ playAnimations
//  (
//    car.position.x - carWidth, car.position.y, 0, 0, 245, 112, 4, 1, carAngleDegrees+90, "booost", "boost.png"); }, 3
//  );


function drawSprite(name, width, height, source, posX, posY, rotation, centreOfRotX, centreOfRotY)
{
  name = new Image();
  name.width = width;
  name.height = height;
  name.src = source;
  //name.x = 0;
  //name.y = 0;
  name.onload = function()
  {
    if(rotation != 0)
    {

        context.translate(centreOfRotX, centreOfRotY);
        context.rotate((rotation + 180) * Math.PI / 180);
        context.drawImage(name, -name.width/2, -name.height/2, name.width, name.height);
        context.rotate(-(rotation + 180) * Math.PI / 180);
        context.translate(-centreOfRotX, -centreOfRotY);

    }
    else
    {
      context.drawImage(name, posX, posY, name.width, name.height);
      //console.log("drawn");
    }
  }
} // End of drawSprite()



  // The postion of the frame
  var x = 500;
  var y = 300;

  // Coordinates of top-left of sprite image
  var srcX = 0;
  var srcY = 0;

  // Dimensions of sprite sheet
  var sheetWidth = 245;
  var sheetHeight = 112;

  // Number or sprites in each column and row
  var cols = 4;
  var rows = 1;

  // Dimensions of each sprite
  var width = sheetWidth / cols;
  var height = sheetHeight / rows;


  var currentFrame = 0;
  function updateFrame()
  {
    currentFrame = ++currentFrame % cols;
    srcX = currentFrame * width;
    srcY = 0;
  }


  function drawMovingImage()
  {
    currentFrame = ++currentFrame % cols;
    srcX = currentFrame * width;
    srcY = 0;
    context.drawImage(boostImg, srcX, srcY, width, height, x, y, width, height);
    //drawSprite(name, width, height, source, posX, posY, rotation)
    //drawSprite("boost_image", 50, 100, boost.png, posX, posY, rotation)
  }
  //setInterval(function(){ drawMovingImage(); }, 3);
  //clearInterval(i);



  function checkForGoal()
  {
    if(ball.position.x > 1150)
    {
      playerOneScore++;
      goalReset();
      updateScoreboard();
    }

    if(ball.position.x < 100)
    {
      playerTwoScore++;
      goalReset();
      updateScoreboard();
    }
  }

  function goalReset()
  {
    goalSound.play();
    car.position.x = 200;
    car.position.y = 350;
    car2.position.x = 1050;
    car2.position.y = 350;
    ball.position.x = window.innerWidth/2;
    ball.position.y = window.innerHeight/2;
  }


  //var playerOneScore = 0;
  //var playerTwoScore = 0;
  //function updateScoreboard()
  //{
  //  document.getElementById("1").innerHTML = "   " + playerOneScore; // Undefined or null reference, no clue why
  //  document.getElementById("2").innerHTML = "   " + playerTwoScore; // Undefined or null reference, no clue why
  //}


  ////////////////////////////////////////////// MAIN lOOP
    function cycle()
  {
    playSounds(backgroundAudio, carAudio);
    //addSprites();

    //drawSprite("carPic2", 100, 40, "boost.png", car.position.x, car.position.y, carAngleDegrees, car.position.x, car.position.y);

    /// Make the goal move up and down
    var py = 250 + 30 * Math.sin(engine.timing.timestamp * 0.002);
    Body.setVelocity(leftGoal, { x: 0, y: py - leftGoal.position.y });
    Body.setPosition(leftGoal, { x: 100, y: py });

    var qy = 250 + 30 * Math.sin(engine.timing.timestamp * 0.002);
    Body.setVelocity(rightGoal, { x: 0, y: qy - rightGoal.position.y });
    Body.setPosition(rightGoal, { x: 100, y: qy });

    //drawMovingImage();
    //playAnimations();
    //bricks();
    calculateAngle();
    calculateAngle2();
    controls();
    controls2();
    //checkForGoal();
    //updateScoreboard();
    requestAnimationFrame(cycle);
  }
  cycle();


  function addSprites()
  {
    drawSprite("floor_1", 60, 60, "assets/graphics/bricks.png", 10, 480, 0);
    drawSprite("carPic", 100, 40, "assets/graphics/race_car_forwards.png", car.position.x, car.position.y, carAngleDegrees, car.position.x, car.position.y);
    drawSprite("carPic2", 100, 40, "assets/graphics/muscle_car_backwards.png", car2.position.x, car2.position.y, carAngleDegrees2, car2.position.x, car2.position.y);
  }


  // run the engine
  Engine.run(engine);
  //Engine.update(engine);

  // run the renderer
  Render.run(render);
  }
window.onload = game();
