/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function TwistFilter() {
    core.AbstractFilter.call(this,
  
    null,

    fs.readFileSync(__dirname + '/twist.frag', 'utf8'),
      
  {
        rand: {type: '1f', value: 0.5},
        timer: {type: '1f', value: 0},
        val2: {type: '1f', value: 5},
        val3: {type: '1f', value: 55},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    }
  );

}

TwistFilter.prototype = Object.create(core.AbstractFilter.prototype);
TwistFilter.prototype.constructor = TwistFilter;

Object.defineProperty(TwistFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});

Object.defineProperty(TwistFilter.prototype, 'timer', {
    get: function() {
        return this.uniforms.timer.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.timer.value = value;
    }
});

Object.defineProperty(TwistFilter.prototype, 'val2', {
    get: function() {
        return this.uniforms.val2.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.val2.value = value;
    }
});

Object.defineProperty(TwistFilter.prototype, 'val3', {
    get: function() {
        return this.uniforms.val3.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.val3.value = value;
    }
});

module.exports = TwistFilter;