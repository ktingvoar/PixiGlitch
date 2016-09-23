precision mediump float;
uniform float rand;
uniform float timer;
uniform vec4 dimensions;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
void main (void)
{
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec2 sampleFrom = (pos + vec2(sin(pos.y * 0.03 + timer * 20.0) * (6.0 + 12.0 * rand), 0)) / vec2(dimensions);
   vec4 col_s = texture2D(uSampler, sampleFrom);
   gl_FragColor.rgba = col_s.rgba;
}