function DefaultHero2(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        mainColor: '#FF860D',
        extraColor: '#75420E'
    });

    DefaultHero.call(this, opts);

    if (render !== false) {
        this.render();
    }
}

meta.Class( DefaultHero2 )

    .extend_from( DefaultHero )
;
