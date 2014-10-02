var PIXI_GLITCH = PIXI_GLITCH || {};
PIXI_GLITCH.PassThroughFilter = function()
{
    PIXI.AbstractFilter.call( this );

    this.passes = [this];

    this.fragmentSrc = [
        'precision mediump float;',
        'uniform sampler2D uSampler;',
        'varying vec2 vTextureCoord;',
        'void main (void)',
        '{',
          'vec4 col = texture2D(uSampler, vTextureCoord);',
          'gl_FragColor.rgba = col.rgba;',
        '}'
    ];

};

PIXI_GLITCH.PassThroughFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI_GLITCH.PassThroughFilter.prototype.constructor = PIXI_GLITCH.PassThroughFilter;


