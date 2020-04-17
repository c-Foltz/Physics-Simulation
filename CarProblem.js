
// // Grab the canvas
// var canvas = document.getElementById("world");
// canvas.width = 1600;
// canvas.height = 400;

// module aliases
var force = false;
var enterNumber = null;
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Bounds = Matter.Bounds,
    Body = Matter.Body;


// create an engine
var engine = Engine.create(),
    world = engine.world;
    //engine.world.gravity.y = 0;



// create a renderer
var render = Render.create({
    element: document.body,
    // element: canvas,
    engine: engine,
    options: {
        width: document.documentElement.clientWidth,
        height: 400,
        wireframes: false,
        hasBounds: true,
        showPositions: false,
        
    }
});

// Set world bounds bigger than render
world.bounds.min.x = -300;
world.bounds.max.x = 1900;
world.bounds.min.y = -300;
world.bounds.max.y = 700;

// Get viewport center
var viewportCentre = {
    x: render.options.width * 0.5,
    y: render.options.height * 0.5
};

var d = {friction: 0, frictionAir: 0};
var dst = { isStatic: true, friction: 0,frictionAir:0 };

// Create Runner
var runner = Runner.create();
    Runner.run(runner, engine);


// Create World
World.add(world, [
    // walls
    // Bodies.rectangle(400, 0, 2000, 10,dst),
        // middle floor
    Bodies.rectangle(800, 200, 2000, 10, dst),
        // left wall
    Bodies.rectangle(0, 400, 50, 800, dst ),
        // Floor
    Bodies.rectangle(800, 395, 2000, 10, dst),
        // Right Wall
    Bodies.rectangle(2150, 200, 1000, 400, dst)
]);

// Create Balls
World.add(world, [
    ball2 = Bodies.circle(50, 375, 20, d),
    ball1 = Bodies.circle(50, 190, 20, d)
])

// Set Bounds of ball1 to size viewport
// ball1.bounds.x = 1600;
var ball1X = ball1.position.x
var ball2X = ball2.position.x
var trace1 = {
    x: [1],
    y: [1],
  };
// var xPlot = document.getElementById("xGraph")
// Plotly.plot('xGraph', [trace1])

var started = false;
var first = true;
var velocity1 = 0;
var acceleration1 = 0;
var velocity2 = 0;
var acceleration2 = 0;

function rand() {
  return Math.random();
}

var layout = {
    xaxis: {
        title: "Time",
        // range: [0, 300],
        showgrid: false,
        rangemode: 'nonnegative',
    },
    yaxis: {
        title: "Distance [m]",
        range: [0, 155],
        showgrid: false,
    }
};



Plotly.plot('graph', [{
    y: [0],
    mode: 'line', 
    marker: {color: 'red', size: 8},
    line: {width: 4},
    name: "Top Ball"
  }, {
    y: [0],
    mode: 'line',
    marker: {color: 'blue', size:8},
    line: {width: 4},
    name: "Bottom Ball"
  }], layout, {displayModeBar: false}, {displaylogo: false}, {scrollZoom: false});
var stop = false;



function submitted(){
    started = true;
    //startScene();
}

function setPosition1(val3){
    Body.setPosition(ball1, {x:50+parseFloat(val3), y:190})
    // Plotly.extendTraces('graph', {
    //     y: [[ball1.position.x/10], [ball2.position.x/10]]
    //   }, [0, 1])
};

function setPosition2(val4){
    Body.setPosition(ball2, {x:50+parseFloat(val4), y:375})
    // Plotly.extendTraces('graph', {
    //     y: [[ball1.position.x/10], [ball2.position.x/10]]
    //   }, [0, 1])
};

function setVelocity1(val){
    velocity1 = val;
}

function setVelocity2(val){
    velocity2 = val;
}

function setAcceleration1(val){
    acceleration1=val;
}

function setAcceleration2(val){
    acceleration2=val;
}

function increaseVelocity1(val){
    Matter.Body.setVelocity(ball1,{x:parseFloat(val),y:0});
    // console.log(ball1.velocity)
};

function increaseVelocity2(val){
    Matter.Body.setVelocity(ball2,{x:parseFloat(val),y:0});
    // console.log(ball1.velocity)
};

function increaseAcceleration1(val2){
    // console.log(ball)
    Matter.Body.applyForce(ball1, {x:ball1.position.x, y:ball1.position.y}, {x:parseFloat(val2)/1e3, y:0});
    //Render.lookAt(render, ball1)
    // console.log("time"+engine.timing.timestamp/1000)
    
};

function increaseAcceleration2(val2){
    console.log(ball2)
    Matter.Body.applyForce(ball2, {x:ball2.position.x, y:ball2.position.y}, {x:parseFloat(val2)/1e3, y:0});
    //Render.lookAt(render, ball1)
    // console.log("time"+engine.timing.timestamp/1000)
    
};

function startScene(){
    console.log("working")
    if (started && !stop){
        if( ball1.position.x >= 1530 && ball2.position.x >= 1530){
            // Event.off(engine, "afterUpdate")
            stop = true
        }
        // while( ball1.position.x < 1530 && ball2.position.x < 1530){
        // for(var i =0; i <100; i++){
        increaseAcceleration1(acceleration1);
        increaseAcceleration2(acceleration2);
        if(first){
            increaseVelocity1(velocity1);
            increaseVelocity2(velocity2);
            console.log(ball1.position.x)
        }
        first = false;
        //Engine.update(engine)

        // Plotly.extendTraces('xGraph', {
        //     y: [[2]]
        //   }, [0])
        Plotly.extendTraces('graph', {
            y: [[ball1.position.x/10], [ball2.position.x/10]]
          }, [0, 1])

       
        
        
        // }
    }
};


// console.log("time"+engine.timing.timestamp)


Events.on(engine, "tick", startScene)
// Events.on(engine, "beforeUpdate", function(){
//     translate = {
//         x: viewportCentre.x+ball1.position.x,
//         y: 0
//     };
//     Bounds.translate(render.bounds, translate);
// })


//Events.on(engine, "afterUpdate", ()=>force1(ball2, parseInt(val2)))
Render.run(render);



// PLOTTING DISTANCE AND VELOCITY


    // var ball1X = ball1.position.x
    // var ball2X = ball2.position.x
    // var xPlot = document.getElementById("xGraph")
    // Plotly.plot(xPlot, [{
	// x: engine.timing.timestamp/1000,
	//     y: ball1X }])



