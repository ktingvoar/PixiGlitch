var PIXI_GLITCH = PIXI_GLITCH || {};
PIXI_GLITCH.SwellFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    this.uniforms = {
        rand: {type: '1f', value: 0.5},
        dimensions: {type: '4fv', value:[0,0,0,0]}
    };

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform float rand;',
        'uniform vec4 dimensions;',
        'uniform sampler2D uSampler;',
        'varying vec2 vTextureCoord;',
        'void main (void)',
        '{',

        '}'
    ];

};

PIXI_GLITCH.SwellFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI_GLITCH.SwellFilter.prototype.constructor = PIXI_GLITCH.SwellFilter;


