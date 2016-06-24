/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function NoiseFilter() {
  core.AbstractFilter.call(this,
    null,
    fs.readFileSync(__dirname + '/noise.frag', 'utf8')
    , {
      rand      : {type: '1f', value: 1.5},
      strength  : {type: '1f', value: 0.25},
      dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    }
  );
}

NoiseFilter.prototype = Object.create(core.AbstractFilter.prototype);
NoiseFilter.prototype.constructor = NoiseFilter;

Object.defineProperty(NoiseFilter.prototype, 'strength', {
  get: function () {
    return this.uniforms.strength.value;
  },
  set: function (value) {
    this.dirty = true;
    this.uniforms.strength.value = value;
  }
});

Object.defineProperty(NoiseFilter.prototype, 'rand', {
  get: function () {
    return this.uniforms.rand.value;
  },
  set: function (value) {
    this.dirty = true;
    this.uniforms.rand.value = value;
  }
});

module.exports = NoiseFilter;