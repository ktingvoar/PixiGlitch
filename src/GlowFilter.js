var PIXI_GLITCH = PIXI_GLITCH || {};
PIXI_GLITCH.GlowFilter = function()
{
  PIXI.AbstractFilter.call( this );

  this.passes = [this];

  this.uniforms = {
    dimensions: {type: '4fv', value:[0,0,0,0]}
  };

  this.fragmentSrc = [
    'precision mediump float;',
    'uniform vec4 dimensions;',
    'uniform sampler2D uSampler;',
    'varying vec2 vTextureCoord;',
    'const int blur_w = 8;',
    'void main (void)',
    '{',
      'vec2 pos = vTextureCoord;',
      'float blur_x = float(blur_w) / dimensions.x;',
      'float blur_y = float(blur_w) / dimensions.y;',
      'float e = 2.718281828459045235360287471352;',
      'vec4 col = texture2D(uSampler, vTextureCoord);',
      'float pi = 3.1415926535;',
      'vec4 gws = vec4(0.0, 0.0, 0.0, 1.0);',
      'float k = 1.0;',
      'float weight = (1.0 / (float(blur_w) * 2.0 + 1.0) / (float(blur_w) * 2.0 + 1.0)) / 1000.0;',
      'weight = 1.0;',
      'for (int i = 0; i < blur_w * blur_w; i++) {',
        'float ix = float(i) / dimensions.x;',
        'float iy = float(i) / dimensions.y;',
        'gws = gws + texture2D(uSampler, vec2(pos.x + float(mod(ix, float(blur_x))), pos.y + iy / blur_y)) * weight * 1.3;',
        'gws = gws + texture2D(uSampler, vec2(pos.x - float(mod(ix, float(blur_x))), pos.y + iy / blur_y)) * weight * 1.3;',
        'gws = gws + texture2D(uSampler, vec2(pos.x + float(mod(ix, float(blur_x))), pos.y - iy / blur_y)) * weight * 1.3;',
        'gws = gws + texture2D(uSampler, vec2(pos.x - float(mod(ix, float(blur_x))), pos.y - iy / blur_y)) * weight * 1.3;',
      '}',
      'gl_FragColor.rgba = col + gws;',
    '}'
  ];

};

PIXI_GLITCH.GlowFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI_GLITCH.GlowFilter.prototype.constructor = PIXI_GLITCH.GlowFilter;


