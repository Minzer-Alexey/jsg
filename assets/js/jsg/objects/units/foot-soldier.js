function FootSoldier(opts, render) {
    opts = opts || {};

    meta.Hash( opts ).merge({
        weaponSet: WeaponSet.oneGun(new AutomaticGun({}, false)),
        mainColor: '#559',
        extraColor: '#199EE0'
    });

    Tommy.call(this, opts, render);
}

meta.Class( FootSoldier )

    .extend_from( Tommy )
;
