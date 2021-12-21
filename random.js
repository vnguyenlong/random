let mainCanvas = document.getElementById("myCanvas");
let mainContext = mainCanvas.getContext('2d');

let canvasWidth = mainCanvas.width;
let canvasHeight = mainCanvas.height;

let circles = new Array();

function Circle(angle, sign, radius, rotationRadius, initialX, initialY) {
    this.angle = angle;
    this.sign = sign;
    this.radius = radius;
    this.rotationRadius = rotationRadius;
    this.initialX = initialX;
    this.initialY = initialY;
    this.incrementer = .01 + Math.random() * .1;
}

Circle.prototype.update = function() {

    this.angle += this.incrementer;

    this.currentX = this.initialX + this.rotationRadius * Math.cos(this.angle);
    this.currentY = this.initialY + this.rotationRadius * Math.sin(this.angle);

    if (this.angle >= (Math.PI * 2)) {
        this.angle = 0;
        this.incrementer = .01 + Math.random() * .1;
    }

    mainContext.beginPath();
    mainContext.arc(this.currentX, this.currentY, this.radius, 0, Math.PI * 2, false);
    mainContext.closePath();
    mainContext.fillStyle = 'rgba(177, 0, 129, .1)';
    mainContext.fill();
};

function createCircles() {
    for (let i = 0; i < 50; i++) {
        let radius = 5 + Math.random() * 40;
        let initialX = canvasWidth / 2;
        let initialY = canvasHeight / 2;
        let rotationRadius = 1 + Math.random() * 30;
        let angle = Math.random() * 2 * Math.PI;

        let signHelper = Math.floor(Math.random() * 2);
        let sign;

        if (signHelper == 1) {
            sign = -1;
        } else {
            sign = 1;
        }

        let circle = new Circle(angle, sign, radius, rotationRadius, initialX, initialY);
        circles.push(circle);
    }

    requestAnimationFrame(draw);
}
createCircles();

function draw() {
    mainContext.clearRect(0, 0, canvasWidth, canvasHeight);
    mainContext.fillStyle = '#F6F6F6';
    mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];
        circle.update();
    }

    requestAnimationFrame(draw);
}