precision mediump float;
uniform sampler2D uSampler;
uniform float rand;
uniform float val1;
uniform float val2;
uniform vec4 dimensions;
varying vec2 vTextureCoord;
void main (void)
{
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec2 posOffset = pos + vec2(floor(sin(pos.y / val1 * rand + rand * rand)) * val2 * rand, 0);
   posOffset = posOffset / vec2(dimensions);
   vec4 col = texture2D(uSampler, posOffset);
   gl_FragColor.rgba = col.rgba;
}