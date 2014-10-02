var PIXI_GLITCH = PIXI_GLITCH || {};
PIXI_GLITCH.InvertFilter = function()
{
  PIXI.AbstractFilter.call( this );

  this.passes = [this];

  this.uniforms = {
    enabled: {type: '1f', value: true}
  };

  this.fragmentSrc = [
    'precision mediump float;',
    'uniform sampler2D uSampler;',
    'uniform bool enabled;',
    'varying vec2 vTextureCoord;',
    'void main (void)',
    '{',
      'gl_FragColor = texture2D(uSampler, vTextureCoord);',
      'if (enabled) {',
        'gl_FragColor.r = 1.0 - gl_FragColor.r;',
        'gl_FragColor.g = 1.0 - gl_FragColor.g;',
        'gl_FragColor.b = 1.0 - gl_FragColor.b;',
      '}',
    '}'
  ];

};

PIXI.InvertFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI.InvertFilter.prototype.constructor = PIXI.InvertFilter;


