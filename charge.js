class Charge {
    constructor (mass, charge, position) {
        this.charge = charge;
        this.mass = mass;
        this.position = position;
    }

    getCharge() {
        return this.charge;
    }

    getMass() {
        return this.mass;
    }

    setCharge(charge) {
        this.charge = charge;
    }

    setMass(mass) {
        this.mass = mass;
    }

    toString() {
        return `Charge: ${this.charge} Mass: ${this.mass}`;
    }

    getStrength(distance) {
        const E = distance.copy();
        E.normalize();
        E.mult(this.charge / (distance.mag() * distance.mag()));
        return E;
    }

    getForce(charge) {
        let distance = charge.position.copy();
        distance.sub(this.position);
        let E = this.getStrength(distance);
        E.mult(charge.charge);
        return E;
    }
}

export default Charge;