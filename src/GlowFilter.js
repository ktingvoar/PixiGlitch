/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function GlowFilter() {
    PIXI.AbstractFilter.call(this,

      null,

      fs.readFileSync(__dirname + '/glow.frag', 'utf8'),

    {
        blur_w: {type: '1i', value: 8},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    }
  );
};

GlowFilter.prototype = Object.create(core.AbstractFilter.prototype);
GlowFilter.prototype.constructor = GlowFilter;


Object.defineProperty(GlowFilter.prototype, 'blur', {
    get: function() {
        return this.uniforms.blur_w.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.blur_w.value = Math.floor(value);
    }
});

module.exports = GlowFilter;