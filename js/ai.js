function AI(opts) {
    var self = {};

    var _units = opts.units;
    var _target = opts.target;

    var _changeAction = true;
    var _changeActionTimer = setInterval(function () {
        _changeAction = true;
    }, 700);

    self.resolve = function() {
        for (var i = 0; i < _units.length; i++) {
            if (_units[i].getObjectType() & UNIT_TYPE_ENEMY) {
                _units[i].aimAt(_target.x, _target.y);   // aim at target

                if (!canShoot(_units[i])) {    // prevent friendly fire
                    _units[i].stopShooting();
                }

                if (_changeAction == true) {    // random behaviour
                    if (random() > 0.5) {
                        _units[i].stopShooting();
                        _units[i].startMoving(MathUtility.getLinesAngle(
                            _units[i].x,
                            _units[i].y,
                            _target.x,
                            _target.y
                        ) + random() * 90 - 45);
                    } else {
                        _units[i].stopMoving();
                        if (canShoot(_units[i])) {
                            _units[i].startShooting();
                        }
                    }
                }
            }
        }
        _changeAction = false;
    };

    self.stop = function() {
        clearInterval(_changeActionTimer);
        for (var i = 0; i < _units.length; i++) {
            _units[i].stopShooting();
            _units[i].stopMoving();
        }
    };

    function canShoot(shooter) {        // check all friends on firing lines
        for (var k = 0; k < _units.length; k++) {
            if ((_units[k].getObjectType() & UNIT_TYPE_ENEMY) && isOnFiringLine(shooter, _units[k])) {
                return false;
            }
        }
        return true;
    }

    function isOnFiringLine(shooter, target) {
        return MathUtility.isRayPassThroughCircle(
            shooter._weapon.x,
            shooter._weapon.y,
            shooter._weapon.angle,
            target.x,
            target.y,
            target._radius
        );
    }

    return self;
}
