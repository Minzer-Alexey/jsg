define(function (require, exports, module) {
    var meta = require('meta'),
        M    = require('math-util');

    function SquareObject(opts) {
        opts = opts || {};

        this._length = meta.common.first_defined( opts.length, 0 );
        this._width = meta.common.first_defined( opts.width, 0 );
    }

    new meta.Class( SquareObject )

        .define_accessors([
            'length',
            'width'
        ])

        .define_method({
            isPointInside: function (pointX, pointY) {
                var relativeX = (pointX - this.x) * M.cos_d(this.angle) + (pointY - this.y) * M.sin_d(this.angle);
                var relativeY = -(pointX - this.x) * M.sin_d(this.angle) + (pointY - this.y) * M.cos_d(this.angle);
                return (Math.abs(relativeX) <= this._length / 2) && (Math.abs(relativeY) <= this._width / 2);
            }
        })
    ;

    module.exports = SquareObject;
});
