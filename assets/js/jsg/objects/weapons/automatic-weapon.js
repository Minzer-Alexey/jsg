function AutomaticWeapon(opts) {
    opts = opts || {};

    Weapon.call(this, opts);

    this._shootingTimer = null;

    this.setRateOfFire(meta.common.first_defined(opts.rateOfFire, WEAPON.DEFAULT.AUTOMATIC.RATE_OF_FIRE) );
}

Extend(AutomaticWeapon).from(Weapon);

AutomaticWeapon.prototype.startShooting = function() {
    if (this.canMakeNextShot() && this._shootingTimer == null) {
        this.shoot();
        this._shootingTimer = setInterval(this.shoot.bind(this), this.getShootingDelay());

        this.forbidMakeNextShot();        // to forbid shoot faster than rateOfFire (fast clicking)
        setTimeout(this.allowMakeNextShot.bind(this), this.getShootingDelay());
    }
};

AutomaticWeapon.prototype.stopShooting = function() {
    clearInterval(this._shootingTimer);
    this._shootingTimer = null;
};