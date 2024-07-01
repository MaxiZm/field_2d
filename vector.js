class Vector {

    constructor (dx, dy, dz) {
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;

    }

    add(v) {
        this.dx += v.dx;
        this.dy += v.dy;
        this.dz += v.dz;
        return this;
    }

    sub(v) {
        this.dx -= v.dx;
        this.dy -= v.dy;
        this.dz -= v.dz;
        return this;
    }

    mult(s) {
        this.dx *= s;
        this.dy *= s;
        this.dz *= s;
        return this;
    }

    div(s) {
        this.dx /= s;
        this.dy /= s;
        this.dz /= s;
        return this;
    }

    dot (v) {
        return this.dx * v.dx + this.dy * v.dy + this.dz * v.dz;
    }

    mag() {
        return Math.sqrt(this.dx*this.dx + this.dy*this.dy + this.dz*this.dz);
    }

    normalize() {
        var m = this.mag();
        if (m > 0) {
            this.div(m);
        }
    }

    cross(v) {
        var x = this.dy * v.dz - this.dz * v.dy;
        var y = this.dz * v.dx - this.dx * v.dz;
        var z = this.dx * v.dy - this.dy * v.dx;
        return new Vector(x, y, z);
    }

    copy() {
        return new Vector(this.dx, this.dy, this.dz)
    }

}

export default Vector;