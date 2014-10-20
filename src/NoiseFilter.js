/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */

var PIXI_GLITCH = PIXI_GLITCH || {};

PIXI_GLITCH.NoiseFilter = function () {
    PIXI.AbstractFilter.call(this);

    this.passes = [this];

    this.uniforms = {
        rand: {type: '1f', value: 0.5},
        strength: {type: '1f', value: 0.25},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform sampler2D uSampler;',
        'uniform vec4 dimensions;',
        'uniform float rand;',
        'uniform float strength;',
        'varying vec2 vTextureCoord;',

        'vec3 mod289(vec3 x) {',
        '   return x - floor(x * (1.0 / 289.0)) * 289.0;',
        '}',

        'vec2 mod289(vec2 x) {',
        '   return x - floor(x * (1.0 / 289.0)) * 289.0;',
        '}',

        'vec3 permute(vec3 x) {',
        '   return mod289(((x * 34.0) + 1.0) * x);',
        '}',

        'float snoise(vec2 v)',
        '{',
        '   const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);',
        '   vec2 i = floor(v + dot(v, C.yy));',
        '   vec2 x0 = v - i + dot(i, C.xx);',
        '   vec2 i1;',
        '   i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
        '   vec4 x12 = x0.xyxy + C.xxzz;',
        '   x12.xy -= i1;',
        '   i = mod289(i);',
        '   vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0));',
        '   vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);',
        '   m = m * m;',
        '   m = m * m;',
        '   vec3 x = 2.0 * fract(p * C.www) - 1.0;',
        '   vec3 h = abs(x) - 0.5;',
        '   vec3 ox = floor(x + 0.5);',
        '   vec3 a0 = x - ox;',
        '   m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );',
        '   vec3 g;',
        '   g.x  = a0.x  * x0.x  + h.x  * x0.y;',
        '   g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
        '   return 130.0 * dot(m, g);',
        '}',

        'void main (void)',
        '{',
        '   vec4 col = texture2D(uSampler, vTextureCoord);',
        '   vec2 pos = vTextureCoord * vec2(dimensions);',
        '   vec2 posOffset = vec2(pos.x * pos.y + rand * 231.5, pos.x + pos.y - rand * 324.1);',
        '   col.rgb = col.rgb + snoise(posOffset) * strength;',
        '   gl_FragColor.rgba = col.rgba;',
        '}'
    ];

};

PIXI_GLITCH.NoiseFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
PIXI_GLITCH.NoiseFilter.prototype.constructor = PIXI_GLITCH.NoiseFilter;

Object.defineProperty(PIXI_GLITCH.NoiseFilter.prototype, 'strength', {
    get: function() {
        return this.uniforms.strength.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.strength.value = value;
    }
});

Object.defineProperty(PIXI_GLITCH.NoiseFilter.prototype, 'rand', {
    get: function() {
        return this.uniforms.rand.value;
    },
    set: function(value) {
        this.dirty = true;
        this.uniforms.rand.value = value;
    }
});

