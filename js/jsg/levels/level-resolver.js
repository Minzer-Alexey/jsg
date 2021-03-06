define(function (require, exports, module) {
    var $            = require('jquery'),
        OBJECT_TYPE  = require('const/object-type'),
        DefaultHero2 = require('objects/units/default-hero-2'),
        DefaultHero  = require('objects/units/default-hero'),
        M            = require('math-util'),
        GameContext  = require('game-context');

    var LevelResolver = function () {
        var self = {};
    
        var SPECIAL_OPTION_PREFIX = '$';
    
        self.resolve = function (opts) {
            var levelDef = opts.levelDefinition;
    
            for (var i = 0; i < (opts.playerCount || 1); i++) {
                var defaultConstructor = i == 0 ? DefaultHero : DefaultHero2;
                var playerDef = levelDef.players[i] || {$constructor: defaultConstructor};
                var constructor = playerDef.$constructor || defaultConstructor;
                var player = new constructor(
                    getObjectOpts(playerDef)
                );
                player.objectType = OBJECT_TYPE.PLAYER;
                player.aimAt(Number.MAX_VALUE * M.cos_d(player.angle), Number.MAX_VALUE * M.sin_d(player.angle));
                GameContext.instance.players.add(player);
            }
    
            (levelDef.enemies || []).forEach(function (enemyDef) {
                GameContext.instance.units.add(new enemyDef.$constructor(
                    getObjectOpts(enemyDef)
                ));
            });
    
            (levelDef.effects || []).forEach(function (effectDef) {
                GameContext.instance.effects.add(new effectDef.$constructor(
                    getObjectOpts(effectDef)
                ));
            });
    
            if (levelDef.enemyFactory) {
                var enemyFactory = new levelDef.enemyFactory.$constructor(
                    getObjectOpts(levelDef.enemyFactory)
                );
                GameContext.instance.enemyFactory = enemyFactory;
                enemyFactory.startGenerating();
            }
        };
    
        function getObjectOpts(opts) {
            var res = {};
            for (var key in opts) {
                if (opts.hasOwnProperty(key) && key.charAt(0) != SPECIAL_OPTION_PREFIX) {
                    res[key] = opts[key];
                }
            }
            return res;
        }
    
        return self;
    }();

    module.exports = LevelResolver;
});
