/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function CutSliderFilter() {
    PIXI.AbstractFilter.call(this,
      
      null,

      fs.readFileSync(__dirname + '/cutslider.frag', 'utf8'),


      {
          rand: {type: '1f', value: 5},
          val1: {type: '1f', value: 150},
          val2: {type: '1f', value: 20},
          dimensions: {type: '4fv', value: [0, 0, 0, 0]}
      }
    );
};

CutSliderFilter.prototype = Object.create(core.AbstractFilter.prototype);
CutSliderFilter.prototype.constructor = CutSliderFilter;

Object.defineProperty(CutSliderFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});

Object.defineProperty(CutSliderFilter.prototype, 'val1', {
    get: function() {
        return this.uniforms.val1.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.val1.value = value;
    }
});

Object.defineProperty(CutSliderFilter.prototype, 'val2', {
    get: function() {
        return this.uniforms.val2.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.val2.value = value;
    }
});

module.exports = CutSliderFilter;