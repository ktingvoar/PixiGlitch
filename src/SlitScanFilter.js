/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function SlitScanFilter() {
    core.AbstractFilter.call(this,

      null,

      fs.readFileSync(__dirname + '/slitscan.frag', 'utf8'),

  {
        rand: {type: '1f', value: 15},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    });

};

SlitScanFilter.prototype = Object.create(core.AbstractFilter.prototype);
SlitScanFilter.prototype.constructor = SlitScanFilter;

Object.defineProperty(SlitScanFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});

module.exports = SlitScanFilter;


