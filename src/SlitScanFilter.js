/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */

var PIXI_GLITCH = PIXI_GLITCH || {};

PIXI_GLITCH.SlitScanFilter = function () {
    PIXI.AbstractFilter.call(this);

    this.passes = [this];

    this.uniforms = {
        rand: {type: '1f', value: 15},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform float rand;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',
        'varying vec2 vTextureCoord;',
        'void main (void)',
        '{',
        '   float slit_h = rand;',
        '   vec2 pos = vTextureCoord * vec2(dimensions);',
        '   vec2 texCoord = vec2(3.0+floor(pos.x/slit_h)*slit_h ,pos.y);',
        '   vec4 col = texture2D(uSampler, texCoord / vec2(dimensions));',
        '   gl_FragColor.rgba = col.rgba;',
        '}'
    ];

};

PIXI_GLITCH.SlitScanFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
PIXI_GLITCH.SlitScanFilter.prototype.constructor = PIXI_GLITCH.SlitScanFilter;

Object.defineProperty(PIXI_GLITCH.SlitScanFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});


