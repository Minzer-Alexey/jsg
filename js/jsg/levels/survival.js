LevelStorage.add('Survival', {

    player: {
        x: 100,
        y: 100
    },

    enemies: [
        {
            constructor: MachineGunner,
            x: 1400,
            y: 100
        }, {
            constructor: Recruit,
            x: 1300,
            y: 700
        }, {
            constructor: FootSoldier,
            x: 1200,
            y: 450
        }, {
            constructor: GuyWithPanzerschreck,
            x: 1400,
            y: 800
        }, {
            constructor: Destroyer,
            x: 1400,
            y: 350
        }
    ],

    effects: [
        {
            constructor: BulletReflectEffect,
            x: 250,
            y: 700,
            active: true
        }
    ],

    enemyFactory: {
        constructor: EnemyFactory,
        generatingDelay: 2000
    }
});
