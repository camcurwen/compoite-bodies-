var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#666555',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0.2
            },
            debug: true,
            debugBodyColor: 846122
        }
    },
    scene: {
        create: create
    }
};

var game = new Phaser.Game(config);

function create() {
    this.matter.world.setBounds();

    this.matter.add.mouseSpring();
 
    var group = this.matter.world.nextGroup(true);


    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.Factory.html#stack__anchor
    //Create a new composite containing bodies created in the callback in a grid arrangement.
    //This function uses the body bounds to prevent overlaps.
    var bridge = this.matter.add.stack(450, 100, 4, 1, 0, 0, function (x, y) {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, {
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05
        });
    });


    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.Factory.html
    //Chains all bodies in the given composite together using constraints.
    this.matter.add.chain(bridge, 0.3, 0, -0.3, 0, {
        stiffness: 1,
        length: 2,
        render: {
            visible: true
        }
    });

   

    

    var rect1 = Phaser.Physics.Matter.Matter.Bodies.rectangle(10, 20, 50, 50);
    this.matter.world.add(rect1);

    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.Factory.html#joint__anchor
    //add a rectangle to the end of a chain.
    this.matter.add.joint(bridge.bodies[bridge.bodies.length - 1], rect1, 80, 0.1);


    //create another rect
   // var rect = Phaser.Physics.Matter.Matter.Bodies.rectangle(200, 200, 50, 50);
   // var circ1 = Phaser.Physics.Matter.Matter.Bodies.circle(250, 200, 25);
   // var circ2 = Phaser.Physics.Matter.Matter.Bodies.circle(150, 200, 25);
   // var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
    //    parts: [rect, circ1, circ2]
   // });

    //constrain the beginning of the birdge to a fixed point.
   // this.matter.add.worldConstraint(compoundBody, 2, 0.9, {
     //   pointA: { x: 150, y: 200 },
      //  pointB: { x: -25, y: 0 }
   // });


    // new second bridge point
    //create another rect
    var rect = Phaser.Physics.Matter.Matter.Bodies.rectangle(300, 300, 100, 100);
    var circ1 = Phaser.Physics.Matter.Matter.Bodies.circle(350, 300, 25);
    var circ2 = Phaser.Physics.Matter.Matter.Bodies.circle(250, 300, 25);
    var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
        parts: [rect, circ1, circ2]
    });

    //constrain the beginning of the birdge to a fixed point.
    this.matter.add.worldConstraint(compoundBody, 2, 0.9, {
        pointA: { x: 250, y: 300 },
        pointB: { x: -25, y: 0 }
    });

    this.matter.world.add(compoundBody);


    var rect = Phaser.Physics.Matter.Matter.Bodies.rectangle(100, 200, 50, 50);
    var circ1 = Phaser.Physics.Matter.Matter.Bodies.circle(150, 200, 25);
    var circ2 = Phaser.Physics.Matter.Matter.Bodies.circle(50, 200, 25);
    var compoundBody1 = Phaser.Physics.Matter.Matter.Body.create({
        parts: [rect, circ1, circ2]
    });
    this.matter.world.add(compoundBody1);


    //https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Matter.Factory.html#joint__anchor
    //add a rectangle to the end of a chain.
    this.matter.add.joint(rect1, compoundBody1, 80, 0.1);


    //add a sqauare grid of Bodies.
    //6 in a column, 3 in a row.
    var stack = this.matter.add.stack(250, 50, 6, 3, 0, 0, function (x, y) {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 50, 50, Phaser.Math.Between(20, 20));
    });

    //add the rectangles on the left
    this.matter.add.rectangle(100, 450, 420, 30, {
        isStatic: true,
        chamfer: { radius: 20 }
    }),

    //add the rectangles on the right
    this.matter.add.rectangle(700, 500, 190, 380, {
        isStatic: true,
        chamfer: { radius: 20 }
    }),

	//constrain the beginning of the birdge to a fixed point.
	this.matter.add.worldConstraint(bridge.bodies[0], 2, 0.9, {
		pointA: { x: 450, y: 100 },
		pointB: { x: -5, y: 0 }
        });


    //constrain the end of the birdge to a fixed point.
   // this.matter.add.worldConstraint(bridge.bodies[bridge.bodies.length - 1], 2, 0.9, {
     //   pointA: { x: 660, y: 300 },
    //    pointB: { x: 25, y: 0 }
 //   });
}
