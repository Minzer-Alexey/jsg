define(function (require, exports, module) {
    var meta             = require('meta'),
        CONTROLS         = require('config/controls'),
        ControlInterface = require('control/control-interface'),
        Cursor           = require('control/cursor'),
        FakeUnit         = require('objects/units/fake-unit'),
        GameContext      = require('game-context');

    function Control(opts) {
        opts = opts || {};
    
        this._controlledUnitId = opts.controlledUnitId || GameContext.instance.players.get_by_index(0).id;
        this._cursor = opts.cursor || new Cursor();
    
        this._properties = {};
        this._pressedKeys = {};
    
        this.initialize(opts.keyMap || CONTROLS.DEFAULT);
    }
    
    new meta.Class( Control )
    
        .extend_from( ControlInterface )
    
        .define_readers({
            'cursor': 'default',
            'controlledUnit': function () {
                return GameContext.instance.units.get(this._controlledUnitId) || FakeUnit.instance();
            }
        })
    
        .define_method('initialize', function _initializeProperties(keyMap, basePath) {
            basePath = basePath || '';
            Object.keys(keyMap).forEach(function (k) {
                if (meta.common.is_object(keyMap[k])) {
                    _initializeProperties.call(this, keyMap[k], basePath + k + '.')
                } else {
                    this._properties[basePath + k] = keyMap[k];
                }
            }, this);
        })
        
        .define_methods({
            markKeyAsPressed: function (key) {
                this._pressedKeys[this._keyCode(key)] = true;
            },
    
            markKeyAsReleased: function (key) {
                this._pressedKeys[this._keyCode(key)] = false;
            },
    
            isPressed: function (key) {
                return this._pressedKeys[this._keyCode(key)] === true;
            },
    
            getProperty: function (keyString, defaultValue) {
                return meta.common.first_defined(this._properties[keyString], defaultValue, -1);
            },
    
            _keyCode: function (keyCodeOrString) {
                return typeof keyCodeOrString == 'string' ? this.getProperty(keyCodeOrString) : keyCodeOrString;
            }
        })
    ;

    module.exports = Control;
});
