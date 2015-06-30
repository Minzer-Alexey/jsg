function Weapon(opts) {
    var self = ShapedObject(opts);
    
    self._frontLength = WEAPON_FRONT_LENGTH;                       // influence on bullets start coordinates
    self._weaponOffsetY = opts.weaponOffsetY || UNIT_RADIUS - 5;   // offset between weapon's and unit's centers
    self._weaponOffsetX = opts.weaponOffsetX || 0;

    self._hardness = WEAPON_HARDNESS;             // max number of bullets to reduce the accuracy
    self._state = self._hardness;                 // current number of bullets to reduce the accuracy
    self._maxSector = WEAPON_MAX_SECTOR;          // if accuracy = 0, bullets will be in this sector (degrees)

    self._bullets = opts.bullets;           // reference to global bullet array
    self._bulletConstructor = Bullet;

    self._shootingDelay = WEAPON_SHOOTING_DELAY;  // min time interval between 2 shots
    self._canShoot = true;

    self.shoot = function() {
        self._bullets.push(self._bulletConstructor({
            stage: self._stage,
            bullets: self._bullets,
            x: self.x + self._frontLength * cos_d(self.angle),
            y: self.y + self._frontLength * sin_d(self.angle),
            angle: self.angle + (1 - self._getAccuracy()) * (self._maxSector * random() - self._maxSector / 2)
        }));

        self._harmWeapon();
    };

    self.startShooting = function() {
        if (self._isShootingAllowed()) {
            self.shoot();       // single shot

            self._forbidShoot();
            setTimeout(function() {
                self._allowShoot();
            }, self._shootingDelay);
        }
    };

    self.stopShooting = function() {};

    self.fix = function() {
        self._state = self._hardness;
    };

    self.setHardness = function(hardness) {
        self._state = self._hardness = hardness;
    };

    self.aimAt = function(targetX, targetY, unitX, unitY, unitAngle) {
        self.angle = MathUtility.getLinesAngle(
            unitX - self._weaponOffsetY * sin_d(unitAngle) + self._weaponOffsetX * cos_d(unitAngle),
            unitY + self._weaponOffsetY * cos_d(unitAngle) + self._weaponOffsetX * sin_d(unitAngle),
            targetX,
            targetY
        );

        self.x = unitX - self._weaponOffsetY * sin_d(unitAngle) + self._weaponOffsetX * cos_d(unitAngle);
        self.y = unitY + self._weaponOffsetY * cos_d(unitAngle) + self._weaponOffsetX * sin_d(unitAngle);
    };

    // @Override
    self.p_destroyShapes = self.destroyShapes;    // save parents function
    self.destroyShapes = function() {             // destroy own shapes and start destroying of children
        self.p_destroyShapes();
        self.stopShooting();
    };

    self._allowShoot = function() {
        self._canShoot = true;
    };

    self._forbidShoot = function() {
        self._canShoot = false;
    };

    self._isShootingAllowed = function() {
        return self._canShoot;
    };

    self._getAccuracy = function() {
        return self._state / self._hardness;
    };

    self._harmWeapon = function() {
        if (self._state > 0) {
            self._state--;
        }
    };

    return self;
}
