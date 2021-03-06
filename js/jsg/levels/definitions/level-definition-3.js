define(function (require, exports, module) {
    var meta                 = require('meta'),
        LevelDefinition      = require('levels/definitions/level-definition'),
        BulletReflectEffect  = require('objects/effects/bullet-reflect-effect'),
        Destroyer            = require('objects/units/destroyer'),
        EnemyFactory         = require('objects/units/factories/enemy-factory'),
        FootSoldier          = require('objects/units/foot-soldier'),
        GuyWithPanzerschreck = require('objects/units/guy-with-panzerschreck'),
        MachineGunner        = require('objects/units/machine-gunner'),
        Recruit              = require('objects/units/recruit'),
        WeaponSet            = require('objects/weapons/weapon-set');

    function LevelDefinition3() {
        LevelDefinition.call(this, {
            id: 3,
            name: 'Defence',
            description: 'Use features of the level to stay alive despite the strength of your enemies'
        })
    }
    
    new meta.Class( LevelDefinition3 )
    
        .extend_from( LevelDefinition )
    
        .define_readers({
            players: function () {
                return [
                    {
                        x: 100,
                        y: 100,
                        weaponSet: WeaponSet.full()
                    }, {
                        x: 100,
                        y: 200,
                        weaponSet: WeaponSet.full()
                    }
                ];
            },
    
            enemies: function () {
                return [
                    {
                        $constructor: MachineGunner,
                        x: 1400,
                        y: 100
                    }, {
                        $constructor: Recruit,
                        x: 1300,
                        y: 700
                    }, {
                        $constructor: FootSoldier,
                        x: 1200,
                        y: 450
                    }, {
                        $constructor: GuyWithPanzerschreck,
                        x: 1400,
                        y: 800
                    }, {
                        $constructor: Destroyer,
                        x: 1400,
                        y: 350
                    }
                ];
            },
    
            effects: function () {
                return [
                    {
                        $constructor: BulletReflectEffect,
                        x: 250,
                        y: 700,
                        active: true
                    }
                ];
            },
    
            enemyFactory: function () {
                return {
                    $constructor: EnemyFactory,
                        generatingDelay: 2000
                }
            }
        })
    ;

    module.exports = LevelDefinition3;
});
