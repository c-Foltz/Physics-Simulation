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
    Body = Matter.Body,
    Constraint = Matter.Constraint;

// create an engine
var engine = Engine.create(),
    world = engine.world;
world.gravity.y = 0;

var render = Render.create({
    element: document.body,
    // element: canvas,
    engine: engine,
    options: {
        width: document.documentElement.clientWidth,
        height: 400,
        wireframes: false,
        hasBounds: true,
        showPositions: true, 
    }
});
var runner = Runner.create();
    Runner.run(runner, engine);

var dst = { isStatic: true, friction: 0,frictionAir:0 };
var prop = { isStatic: true, render: {
    fillStyle: 'white'}
}; 
var xCent = document.documentElement.clientWidth*0.5;

// ADD WALLS AND FLOOR
var floor = Bodies.rectangle(800, 395, 2000, 10, dst);
World.add(world, [
    floor
    // Bodies.rectangle(0, 400, 50, 800, dst ),
    // Bodies.rectangle(1575, 200, 50, 400, dst)
]);

var group = Body.nextGroup(true);
var verticesTest = Matter.Vertices.fromPath('1 1 1 50 50 1');
var vertices = Matter.Vertices.create([
    { x: -300, y: 0 }, { x: 0, y: -200}, { x: 0, y: 0 }
]);

var center = Matter.Vertices.centre(vertices);
var triangle = Bodies.fromVertices(xCent,floor.position.y+center.y-10,vertices, prop);
var pulley = Bodies.circle(xCent-center.x+8, 170, 15, prop);
var sq1 = Bodies.rectangle(xCent, 225, 40, 40, {angle: .98, render: {fillStyle: 'red'}});
var sq2 = Bodies.rectangle(pulley.position.x+20, 250, 40, 40, {render: {fillStyle: 'red'}});
// var sq1 = Bodies.rectangle(xCent, 140, 40, 40,{ render: {fillStyle: 'red'}, collisionFilter: { group: group }});
// var sq2 = Bodies.rectangle(xCent+290, 140, 40, 40, {render: {fillStyle: 'red'}, collisionFilter: { group: group }});


var started = false;

// add pulley constraint
var consPulley = Constraint.create({
    pointA: { x: pulley.position.x, y: pulley.position.y },
    bodyB: pulley,
    length: 0
});

// Add Constaint btwn the two blocks
// var consBlock = Constraint.create({
//     bodyA: sq1,
//     bodyB: sq2,
// });

// Add Constaint btwn the two blocks

var rope = Composites.stack(xCent, 140, 12, 1, 10, 10, function(x, y) {
    return Bodies.rectangle(x, y, 10, 10, { collisionFilter: { group: group } });
});
//Composite.add(rope, sq1);
//Composite.add(rope, sq2);
Composites.chain(rope, 1, 0, -1, 0, { stiffness: 0.8, length: 1, render: { type: 'line' } });

World.add(world,[
    triangle,
    pulley,
    sq1,
    sq2,
    rope,
    consPulley,
   // consBlock

]);




function defMass1(val){
    mass1 = val;
};
function defMass2(val){
    mass2 = val;
};
function setMass1(val){
    Body.setMass(sq1, parseFloat(val));
};
function setMass2(val){
    Body.setMass(sq2, parseFloat(val));
};

function submitted(){
    started = true;
    world.gravity.y = 1;
    setMass1(mass1);
}

Render.run(render);