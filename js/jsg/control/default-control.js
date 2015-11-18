function DefaultControl(opts) {
    opts = opts || {};

    Control.call(this, opts);

    this._pressedKeys = {};
}

Extend(DefaultControl).from(Control);

DefaultControl.prototype.handleKeyDown = function(keyCode) {
    this._pressedKeys[keyCode] = true;
    this._correctPlayerDirection();

    if (this.isPressed('HUCK.FIX_WEAPON')) {
        this._controlledObject.getWeapon().fix();
    }
};

DefaultControl.prototype.handleKeyUp = function(keyCode) {
    this._pressedKeys[keyCode] = false;
    this._correctPlayerDirection();
};

DefaultControl.prototype.handleMouseDown = function(targetX, targetY) {
    this._controlledObject.startShooting();
};

DefaultControl.prototype.handleMouseUp = function(targetX, targetY) {
    this._controlledObject.stopShooting();
};

DefaultControl.prototype.handleMouseMove = function(targetX, targetY) {
    this.getCursor().setPosition({
        x: targetX,
        y: targetY
    });
};

DefaultControl.prototype.handleMouseWheel = function(delta) {
    if (delta > 0) {
        this._controlledObject.chooseNextWeapon();
    } else {
        this._controlledObject.choosePrevWeapon();
    }
};

DefaultControl.prototype.handleRender = function() {
    this.getCursor().updateShapes();
    this._controlledObject.aimAt(this.getCursor().getX(), this.getCursor().getY());
};

DefaultControl.prototype._correctPlayerDirection = function setPlayersDirection() {
    var dx = 0,
        dy = 0;

    if (this.isPressed('MOVE.RIGHT')) {
        dx++;
    }
    if (this.isPressed('MOVE.LEFT')) {
        dx--;
    }
    if (this.isPressed('MOVE.DOWN')) {
        dy++;
    }
    if (this.isPressed('MOVE.UP')) {
        dy--;
    }
    if (dx == 0 && dy == 0) {
        this._controlledObject.stopMoving();
        return;
    }

    var angle = 180 / Math.PI * Math.acos( dx / Math.sqrt(dx*dx + dy*dy) );
    if (dy < 0) {
        angle = -angle;
    }
    this._controlledObject.startMoving(angle);
};
