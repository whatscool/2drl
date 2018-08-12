function game ()
{
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
  engine.world.gravity.y = 0.5;

  // create a renderer
  var render = Render.create
  ({
    //element: canvas,
    element: document.body,
    canvas: canvas,
    engine: engine,
    options:
    {
      width: window.innerWidth - 30,
      height: window.innerHeight - 30,
      wireframes: false,
      background: "background_1.png"
    }
  });



  var offset = 1;
  var wallSize = 20;

  var ground = Bodies.rectangle(400, 510, 1810, 60,
    {
      isStatic: true,
      friction: 0,
      restitution: 0,
      opacity: 0,
      visible: false
    });

  var ball = Bodies.circle(window.innerWidth/2, window.innerHeight/2, 40,
    {
      mass: 5,// Used to be 0.5
      inertia: 0,
      restitution: 0.95,
      friction: 0,
      frictionAir: 0.01,
      render: {sprite: {texture: "football.png", xScale: 0.09, yScale: 0.09}}
    });




    // Arena walls
    var roof = Bodies.rectangle(window.innerWidth/2, -offset, window.innerWidth + 2 * offset, wallSize,
      {
        isStatic: true
      });

    var floor = Bodies.rectangle(window.innerWidth/2, window.innerHeight + offset, window.innerWidth + 2 * offset, wallSize,
      {
        isStatic: true,
        friction: 0,
        opacity: 0,
        visible: false,
        render: {fillStyle: "black"}
        //render: {sprite: {texture: "transparent.png"}}
      });

    var upperRightWall = Bodies.rectangle(1150, 85, wallSize, 200,
    {
      isStatic: true,
      //render: {sprite: {texture: "transparent.png"}}
    });

    var lowerRightWall = Bodies.rectangle(1150, 400, wallSize, 200,
    {
      isStatic: true,
      //render: {sprite: {texture: "transparent.png"}}
    });

    var upperLeftWall = Bodies.rectangle(100, 85, wallSize, 200,
    {
      isStatic: true
    });

    var lowerLeftWall = Bodies.rectangle(100, 400, wallSize, 200,
    {
      isStatic: true
    });



var carWidth = 60,
    carHeight = 20;
const carBody = Matter.Bodies.fromVertices(200, 350, [{x:200, y:200},{x:260, y:210},{x:260, y:220},{x: 200, y: 220}],
{
  render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
});
const frontWheel = Matter.Bodies.circle(carBody.position.x -20, carBody.position.y +15, 8,
{
  render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
});
const rearWheel = Matter.Bodies.circle(carBody.position.x +20, carBody.position.y +15, 8,
{
  render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
});
const refBL = Matter.Bodies.circle(carBody.position.x - carWidth/2, carBody.position.y + carHeight/2, 0.01,
{
  render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
});
const refTL = Matter.Bodies.circle(carBody.position.x - carWidth/2, carBody.position.y - carHeight/2, 0.01,
{
  render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
});
const car = Body.create
({
  parts: [carBody, frontWheel, rearWheel, refBL, refTL],
  inertia: 100000,
  friction: 0,
  mass: 100,
  //frictionStatic: 0.5,
  restitution: -1,
  //sleepThreshold: Infinity,
  //collisionFilter: {group: -2},
});

//**********************************************************************************
// PLAYER 2

var carWidth2 = 60,
    carHeight2 = 20;
const carBody2 = Matter.Bodies.fromVertices(1050, 350, [{x:200, y:200},{x:140, y:210},{x:140, y:220},{x: 200, y: 220}],
  {
    render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
  });
  const frontWheel2 = Matter.Bodies.circle(carBody2.position.x -20, carBody2.position.y +15, 8,
  {
    render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
  });
  const rearWheel2 = Matter.Bodies.circle(carBody2.position.x +20, carBody2.position.y +15, 8,
  {
    render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
  });
const refBR = Matter.Bodies.circle(carBody2.position.x + carWidth2/2, carBody2.position.y + carHeight2/2, 0.01,
{
  render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
});
const refTR = Matter.Bodies.circle(carBody2.position.x + carWidth2/2, carBody2.position.y - carHeight2/2, 0.01,
{
  render: {sprite: {texture: "transparent.png", xScale: 0.09, yScale: 0.09}}
});
const car2 = Body.create
({
  parts: [carBody2, frontWheel2, rearWheel2, refBR, refTR],
  inertia: 100000,
  friction: 0,
  mass: 100,
  //frictionStatic: 0.5,
  restitution: -1,
  //sleepThreshold: Infinity,
  //collisionFilter: {group: -2},
});


//**********************************************************************************

var carOnGround = true,
    carPositionX = car.position.x,
    carPositionY = car.position.y,
    carAngleRadians = 0;
    carAngleDegrees = 0;
    carAngleRadians2 = 0; // Player 2
    carAngleDegrees2 = 0; // Player 2
    carAvailableJumps = 2,
    carAvailableJumps2 = 2; // Player 2
    carDriveForce = 0.002 * car.mass,
    carJumpForce = -0.010 * car.mass,
    carFlipForce = 0.003 * car.mass,
    carAirRotationalForce = 0.0004 * car.mass,
    carBoostForce = 0.00105 * car.mass,
    carMaxSpeedOnGround = 8;





  // Add all of the bodies to the world
  World.add(engine.world, [ground, car, car2, ball, floor, roof, upperLeftWall, lowerLeftWall, upperRightWall, lowerRightWall]);




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
    //console.log(keys[event.keyCode]);
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


function onGround()
{
  //Rear: 471.9451171491292
  //Front: 471.8888231332251
  if(frontWheel.position.y > 465 && rearWheel.position.y > 465)
  {
    carAvailableJumps = 2;
    return true;
  }
  else
  {
    return false;
  }
}


function onGround2()
{
  //Rear: 471.9451171491292
  //Front: 471.8888231332251
  if(frontWheel2.position.y > 465 && rearWheel2.position.y > 465)
  {
    carAvailableJumps2 = 2;
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
    drawSprite("floor_1", 60, 60, "bricks.png", 10 +(i*60), 480, 0);
  }
  drawSprite("floor_1", 30, 60, "bricks.png", 10 +(20*60), 480, 0);
}



//////////////////////////////////////////////////////// AUDIO
var boostAudio = new Audio("boost_sound.wav");
var carAudio = new Audio("car_engine.wav");
carAudio.volume = 0.1;
var carAudio2 = new Audio("car_engine_2.wav");
carAudio.volume = 0.1;
var backgroundAudio = new Audio("crowd_2.wav");
//var backgroundAudio = new Audio("epic_battle_music.mp3");
function playSounds()
{
  console.log("playsounds");
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


  var boostImg = new Image();
  boostImg.src = "boost.png";
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
    var goalSound = new Audio("airhorn.mp3");
    goalSound.play();
    car.position.x = 200;
    car.position.y = 350;
    car2.position.x = 1050;
    car2.position.y = 350;
    ball.position.x = window.innerWidth/2;
    ball.position.y = window.innerHeight/2;
  }


  var playerOneScore = 0;
  var playerTwoScore = 0;
  function updateScoreboard()
  {
    document.getElementById("1").innerHTML = "   " + playerOneScore; // Undefined or null reference, no clue why
    document.getElementById("2").innerHTML = "   " + playerTwoScore; // Undefined or null reference, no clue why
  }


  ////////////////////////////////////////////// MAIN lOOP
    function cycle()
  {
    playSounds();
    addSprites();
    //drawSprite("carPic2", 100, 40, "boost.png", car.position.x, car.position.y, carAngleDegrees, car.position.x, car.position.y);

    //drawMovingImage();
    //playAnimations();
    bricks();
    calculateAngle();
    calculateAngle2();
    controls();
    controls2();
    checkForGoal();
    updateScoreboard();
    requestAnimationFrame(cycle);
  }
  cycle();


  function addSprites()
  {
    console.log("addsprites");
    drawSprite("floor_1", 60, 60, "bricks.png", 10, 480, 0);
    drawSprite("carPic", 100, 40, "race_car_forwards.png", car.position.x, car.position.y, carAngleDegrees, car.position.x, car.position.y);
    drawSprite("carPic2", 100, 40, "muscle_car_backwards.png", car2.position.x, car2.position.y, carAngleDegrees2, car2.position.x, car2.position.y);
  }


  // run the engine
  Engine.run(engine);
  //Engine.update(engine);

  // run the renderer
  Render.run(render);
  }
window.onload = game();
