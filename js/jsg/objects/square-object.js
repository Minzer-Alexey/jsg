function SquareObject(opts) {
    opts = opts || {};

    this._length = this.def( opts.length, 0 );
    this._width = this.def( opts.width, 0 );
}

SquareObject.prototype.isPointInside = function(pointX, pointY) {
    var relativeX = (pointX - this.getX()) * cos_d(this.getAngle()) + (pointY - this.getY()) * sin_d(this.getAngle());
    var relativeY = -(pointX - this.getX()) * sin_d(this.getAngle()) + (pointY - this.getY()) * cos_d(this.getAngle());
    return (Math.abs(relativeX) <= this._length / 2) && (Math.abs(relativeY) <= this._width / 2);
};

SquareObject.prototype.getLength = function() {
    return this._length;
};

SquareObject.prototype.setLength = function(length) {
    this._length = length;
};

SquareObject.prototype.getWidth = function() {
    return this._width;
};

SquareObject.prototype.setWidth = function(width) {
    this._width = width;
};