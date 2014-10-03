var PIXI_GLITCH = PIXI_GLITCH || {};

PIXI_GLITCH.SwellFilter = function () {
    PIXI.AbstractFilter.call(this);

    this.passes = [this];

    this.uniforms = {
        rand: {type: '1f', value: 0.5},
        timer: {type: '1f', value: 0},
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform float rand;',
        'uniform float timer;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',
        'varying vec2 vTextureCoord;',
        'void main (void)',
        '{',
        '   vec2 pos = vTextureCoord * vec2(dimensions);',
        '   vec2 sampleFrom = (pos + vec2(sin(pos.y * 0.03 + timer * 20.0) * (6.0 + 12.0 * rand), 0)) / vec2(dimensions);',
        '   vec4 col_s = texture2D(uSampler, sampleFrom);',
        '   gl_FragColor.rgba = col_s.rgba;',
        '}'
    ];

};

PIXI_GLITCH.SwellFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
PIXI_GLITCH.SwellFilter.prototype.constructor = PIXI_GLITCH.SwellFilter;


