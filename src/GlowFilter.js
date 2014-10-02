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
    'const int blur_w = 10;',
    'const float strength = 1.3;',
    'void main (void)',
    '{',
      'vec2 pos = vTextureCoord * vec2(dimensions);',
      'vec4 col = texture2D(uSampler, vTextureCoord);',
      'vec4 gws = vec4(0.0, 0.0, 0.0, 1.0);',
      'float weight = 1.0 / (float(blur_w) * 2.0 + 1.0) / (float(blur_w) * 2.0 + 1.0);',
      'for (int i = 0; i < blur_w * blur_w; i++) {',
        'float miw = float(mod(float(i), float(blur_w)));',
        'float idw = float(i / blur_w);',
        'vec2 v1 = vec2(pos.x + miw, pos.y + idw);',
        'vec2 v2 = vec2(pos.x - miw, pos.y + idw);',
        'vec2 v3 = vec2(pos.x + miw, pos.y - idw);',
        'vec2 v4 = vec2(pos.x - miw, pos.y - idw);',
        'gws = gws + texture2D(uSampler, v1 / vec2(dimensions)) * weight * strength;',
        'gws = gws + texture2D(uSampler, v2 / vec2(dimensions)) * weight * strength;',
        'gws = gws + texture2D(uSampler, v3 / vec2(dimensions)) * weight * strength;',
        'gws = gws + texture2D(uSampler, v4 / vec2(dimensions)) * weight * strength;',
      '}',
      'gl_FragColor.rgba = col + gws;',
    '}'
  ];

};

PIXI_GLITCH.GlowFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
PIXI_GLITCH.GlowFilter.prototype.constructor = PIXI_GLITCH.GlowFilter;


