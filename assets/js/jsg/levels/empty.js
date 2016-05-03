LevelStorage.add(1, {

    name: 'Try your weapons',

    player1: {
        x: 400,
        y: 450,
        angle: 180,
        weaponSet: new WeaponSet({
            weapons: [
                new GrandfathersGun({}, false),
                new AutomaticGun({}, false),
                new MachineGun({}, false),
                new RocketLauncher({}, false),
                new Mortar({}, false)
            ]
        })
    },

    player2: {
        x: 1200,
        y: 450,
        angle: 0,
        weaponSet: new WeaponSet({
            weapons: [
                new GrandfathersGun({}, false),
                new AutomaticGun({}, false),
                new MachineGun({}, false),
                new RocketLauncher({}, false),
                new Mortar({}, false)
            ]
        })
    },

    effects: [
        {
            $constructor: WindEffect,
            x: 150,
            y: 150
        }, {
            $constructor: BulletReflectEffect,
            x: 150,
            y: 750
        }, {
            $constructor: BulletReflectEffect,
            x: 1450,
            y: 750
        }, {
            $constructor: BulletReflectEffect,
            x: 1450,
            y: 150
        }
    ]
});