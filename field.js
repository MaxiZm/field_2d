import Vector from "./vector.js";

class Field {
    constructor(charges) {
        this.charges = charges;
    }

    getStrength(position) {
        let strength = new Vector(0, 0, 0);
        for (let i = 0; i < this.charges.length; i++) {
            const charge = this.charges[i];
            let distance = position.copy();
            distance.sub(charge.position);
            const E = charge.getStrength(distance);
            strength.add(E);
        }
        return strength;
    }

    getForce(charge) {
        return this.getStrength(charge.position).mult(charge.charge);
    }

    addCharge(charge) {
        this.charges.push(charge);
    }

    removeCharge(charge) {
        const index = this.charges.indexOf(charge);
        this.charges.splice(index, 1);
    }
}

export default Field;