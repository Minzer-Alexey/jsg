function CircleObject(opts) {
    opts = opts || {};

    this._radius = this.def( opts.radius, 0 );
}

CircleObject.prototype.isPointInside = function(pointX, pointY) {
    return MathUtility.isInCircle(pointX, pointY, this.getX(), this.getY(), this._radius);
};

CircleObject.prototype.getRadius = function() {
    return this._radius;
};

CircleObject.prototype.setRadius = function(radius) {
    this._radius = radius;
};