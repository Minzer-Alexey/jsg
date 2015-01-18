function Recruit(opts, init) {
    var self = Unit(opts, true);

    self.setWeaponConstructor(opts.weapon || Weapon);

    self.init = function() {
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#04C9B6").drawCircle(0, 0, 20);
        self.addShape(shape);

        shape = new createjs.Shape();
        shape.graphics.beginFill('#007065').drawRect(0, 0, 10, 38);
        shape.regX = 5;
        shape.regY = 19;
        self.addShape(shape);

        self.setWeapon(self.getWeaponConstructor()({
            stage: self.getStage(),
            bullets: self.getBullets(),
            x: opts.x,
            y: opts.y + self.getWeaponOffsetY
        }));
    };

    if (init !== false) {
        self.init();
    }

    return self;
}