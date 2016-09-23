/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */

var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function ShakerFilter() {
    core.AbstractFilter.call(this,
      
      null,

      fs.readFileSync(__dirname + '/shaker.frag', 'utf8'),


    {
        dimensions: {type: '4fv', value: [0, 0, 0, 0]},
        blur: {type: '2fv', value: [5, 0]}
    }
    );

};

ShakerFilter.prototype = Object.create(core.AbstractFilter.prototype);
ShakerFilter.prototype.constructor = ShakerFilter;

Object.defineProperty(ShakerFilter.prototype, 'blurX', {
    get: function() {
        return this.uniforms.blur.value[0];
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value[0] = value;
    }
});

Object.defineProperty(ShakerFilter.prototype, 'blurY', {
    get: function() {
        return this.uniforms.blur.value[1];
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.blur.value[1] = value;
    }
});

module.exports = ShakerFilter;