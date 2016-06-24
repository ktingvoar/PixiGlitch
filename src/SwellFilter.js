/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function SwellFilter() {
    PIXI.AbstractFilter.call(this,
      
      null,

      fs.readFileSync(__dirname + '/swell.frag', 'utf8'),

  {
        rand: {type: '1f', value: 0.5},
        timer: {type: '1f', value: 0},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    }
    );
};

SwellFilter.prototype = Object.create(core.AbstractFilter.prototype);
SwellFilter.prototype.constructor = SwellFilter;

Object.defineProperty(SwellFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});

Object.defineProperty(SwellFilter.prototype, 'timer', {
    get: function() {
        return this.uniforms.timer.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.timer.value = value;
    }
});

module.exports = SwellFilter;

