/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function ConvergenceFilter() {

    PIXI.AbstractFilter.call(this,

      null,

      fs.readFileSync(__dirname + '/convergence.frag', 'utf8'),

      {
        rand: {type: '1f', value: 0.5},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
      }
    );
};

ConvergenceFilter.prototype = Object.create(core.AbstractFilter.prototype);
ConvergenceFilter.prototype.constructor = ConvergenceFilter;

Object.defineProperty(ConvergenceFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});

module.exports = ConvergenceFilter;