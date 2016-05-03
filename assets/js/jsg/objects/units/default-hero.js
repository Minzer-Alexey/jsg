function DefaultHero(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        speed: PLAYER.SPEED,
        maxHp: PLAYER.HP,
        mainColor: '#73B500',
        extraColor: '#345200'
    });

    Tommy.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( DefaultHero )

    .extend_from( Tommy )
;
