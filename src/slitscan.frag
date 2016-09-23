precision mediump float;
uniform float rand;
uniform vec4 dimensions;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
void main (void)
{
   float slit_h = rand;
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec2 texCoord = vec2(3.0+floor(pos.x/slit_h)*slit_h ,pos.y);
   vec4 col = texture2D(uSampler, texCoord / vec2(dimensions));
   gl_FragColor.rgba = col.rgba;
}