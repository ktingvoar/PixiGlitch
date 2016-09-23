precision mediump float;
uniform sampler2D uSampler;
uniform float rand;
uniform float timer;
uniform float val2;
uniform float val3;
uniform vec4 dimensions;
varying vec2 vTextureCoord;
void main (void)
{
   float trueWidth = dimensions.x;
   float trueHeight = dimensions.y;
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec2 texCoord = vec2(max(3.0, min(float(trueWidth), pos.x + sin(pos.y / (153.25 * rand * rand) * rand + rand * val2 + timer * 3.0) * val3)), max(3.0, min(float(trueHeight), pos.y + cos(pos.x/(251.57 * rand * rand) * rand + rand * val2 + timer * 2.4) * val3)- 3.0));
   vec4 col = texture2D(uSampler, texCoord / vec2(dimensions));
   gl_FragColor.rgba = col.rgba;
}