function LevelResolver(opts) {
    opts = opts || {};

    this._stage = gctx.getStage();
    this._units = gctx.getUnits();
    this._effects = gctx.getEffects();
    this._bullets = gctx.getBullets();

    this._enemyFactory = null;
}

LevelResolver.prototype.resolve = function (level) {
    if (level.enemies) {
        for (var i = 0; i < level.enemies.length; i++) {
            var enemyDefinition = level.enemies[i];
            this._units.push(new enemyDefinition.constructor({
                x: enemyDefinition.x,
                y: enemyDefinition.y,
                angle: enemyDefinition.angle
            }));
        }
    }

    if (level.effects) {
        for (i = 0; i < level.effects.length; i++) {
            var effectDefinition = level.effects[i];
            this._effects.push(new effectDefinition.constructor({
                x: effectDefinition.x,
                y: effectDefinition.y,
                angle: effectDefinition.angle,
                active: effectDefinition.active
            }));
        }
    }

    if (level.enemyFactory) {
        var enemyFactoryDefinition = level.enemyFactory;
        this._enemyFactory = new enemyFactoryDefinition.constructor({
            generatingDelay: enemyFactoryDefinition.generatingDelay
        });
        this._enemyFactory.startGenerating();
    }
};

LevelResolver.prototype.startGenerating = function() {
    this._enemyFactory && this._enemyFactory.startGenerating();
};

LevelResolver.prototype.stopGenerating = function() {
    this._enemyFactory && this._enemyFactory.stopGenerating();
};
