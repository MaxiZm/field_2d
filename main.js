import Field from './field.js';
import Charge from './charge.js';
import Vector from './vector.js';

const canvas = document.getElementById("field");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.9;
const ctx = canvas.getContext("2d");
const chargeSwitcher = document.getElementById('chargeSwitcher');
const raysNumber = document.getElementById('rayNum');
const lengthInput = document.getElementById('length');
const precisionInput = document.getElementById('precision');
const field = new Field([]);
const charges = [];
const mouse = new Vector(0, 0, 0);
var rays_number = 8;
var length = 1000;
var precision = 0.033;

raysNumber.value = rays_number;
lengthInput.value = length;
precisionInput.value = precision;


draw();

raysNumber.addEventListener("change", function() {
    rays_number = raysNumber.value;
    draw();
});

lengthInput.addEventListener("change", function() {
    length = lengthInput.value;
    draw();
});

precisionInput.addEventListener("change", function() {
    precision = precisionInput.value;
    if (precision < 0.001) {
        precision = 0.01;
        precisionInput.value = 0.01;
    }
    draw();
});



canvas.addEventListener("click", function(event) {
    console.log("sas");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const c = chargeSwitcher.checked ? 1 : -1;
    const chargePosition = new Vector(mouseX, mouseY, 0);
    const charge = new Charge(1, c, chargePosition);
    charges.push(charge);
    field.addCharge(charge);
    draw();
});

function power_line(charge, iters) {
    let initial_vectors = [];
    for (let i = 0; i < rays_number; i++) {
        let angle = 2 * Math.PI * i / rays_number;
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        initial_vectors.push(new Vector(x, y, 0));
    }

    initial_vectors.forEach(v => v.normalize());
    for (let v = 0; v < initial_vectors.length; v++) {
        ctx.beginPath();
        ctx.moveTo(charge.position.dx, charge.position.dy);
        const currentPos = charge.position.copy();
        currentPos.add(initial_vectors[v]);
        for (let i = 0; i < iters; i++) {
            const dv = field.getStrength(currentPos);
            dv.normalize();
            dv.mult(precision * Math.sign(charge.charge));
            currentPos.add(dv);
            ctx.lineTo(currentPos.dx, currentPos.dy);
        }
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

function draw() {
    clearCanvas();  // Clear canvas before drawing
    for (let i = 0; i < charges.length; i++) {
        power_line(charges[i], length / precision);
        ctx.beginPath();
        ctx.arc(charges[i].position.dx, charges[i].position.dy, 10, 0, 2 * Math.PI);
        ctx.fillStyle = charges[i].charge > 0 ? "red" : "blue";
        ctx.fill();
        ctx.closePath();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
