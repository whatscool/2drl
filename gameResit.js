
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

const car = Matter.Bodies.fromVertices(carStartPoint[0], carStartPoint[1], carVertices);
const refBL = Matter.Bodies.circle(car.position.x - carWidth/2, car.position.y + carHeight/2, 0.01);
const refTL = Matter.Bodies.circle(car.position.x - carWidth/2, car.position.y - carHeight/2, 0.01);
/*
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
*/


//**********************************************************************************
// PLAYER 2

var carWidth2 = 60,
    carHeight2 = 20;

const car2 = Matter.Bodies.fromVertices(1050, 350, [{x:200, y:200},{x:140, y:210},{x:140, y:220},{x: 200, y: 220}])
const refBR = Matter.Bodies.circle(car2.position.x + carWidth2/2, car2.position.y + carHeight2/2, 0.01)
const refTR = Matter.Bodies.circle(car2.position.x + carWidth2/2, car2.position.y - carHeight2/2, 0.01)
/*
const carBody2 = Matter.Bodies.fromVertices(1050, 350, [{x:200, y:200},{x:140, y:210},{x:140, y:220},{x: 200, y: 220}])
const frontWheel2 = Matter.Bodies.circle(carBody2.position.x -20, carBody2.position.y +15, 8)
const rearWheel2 = Matter.Bodies.circle(carBody2.position.x +20, carBody2.position.y +15, 8)
const refBR = Matter.Bodies.circle(carBody2.position.x + carWidth2/2, carBody2.position.y + carHeight2/2, 0.01)
const refTR = Matter.Bodies.circle(carBody2.position.x + carWidth2/2, carBody2.position.y - carHeight2/2, 0.01)
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
*/




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
        { x:0, y:carAirRotationalForce/2 } );
      Body.applyForce(car,
        { x: (car.position.x + carWidth/2), y: (car.position.y) },
        { x:0, y:-carAirRotationalForce/2 } );
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
        { x:0, y:-carAirRotationalForce/2 } );
      Body.applyForce(car,
        { x: (car.position.x + carWidth/2), y: (car.position.y) },
        { x:0, y:carAirRotationalForce/2 } );


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
        { x:0, y:-carAirRotationalForce/2 } );
      Body.applyForce(car2,
        { x: (car2.position.x - carWidth2/2), y: (car2.position.y) },
        { x:0, y:carAirRotationalForce/2 } );
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
        { x:0, y:-carAirRotationalForce/2 } );
      Body.applyForce(car2,
        { x: (car2.position.x + carWidth2/2), y: (car2.position.y) },
        { x:0, y:carAirRotationalForce/2 } );
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
  if(car.position.y > 500)
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
  if(car2.position.y >500)
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




  ////////////////////////////////////////////// MAIN lOOP
    function cycle()
  {
    /// Make the goal move up and down
    var py = 250 + 30 * Math.sin(engine.timing.timestamp * 0.002);
    Body.setVelocity(leftGoal, { x: 0, y: py - leftGoal.position.y });
    Body.setPosition(leftGoal, { x: 100, y: py });

    var qy = 250 + 30 * Math.sin(engine.timing.timestamp * 0.002);
    Body.setVelocity(rightGoal, { x: 0, y: qy - rightGoal.position.y });
    Body.setPosition(rightGoal, { x: 100, y: qy });

    calculateAngle();
    calculateAngle2();
    controls();
    controls2();

    requestAnimationFrame(cycle);
  }
  cycle();



  // run the engine
  Engine.run(engine);
  //Engine.update(engine);

  // run the renderer
  Render.run(render);
  }
window.onload = game();
