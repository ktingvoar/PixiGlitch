precision mediump float;
uniform vec4 dimensions;
uniform sampler2D uSampler;
uniform int blur_w;
varying vec2 vTextureCoord;
const float strength = 1.3;
void main (void)
{
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec4 col = texture2D(uSampler, vTextureCoord);
   vec4 gws = vec4(0.0, 0.0, 0.0, 1.0);
   float weight = 1.0 / (float(blur_w) * 2.0 + 1.0) / (float(blur_w) * 2.0 + 1.0);
   for (int i = 0; i < 1024; i++) {
       if (i > blur_w * blur_w) {break;}
       float miw = float(mod(float(i), float(blur_w)));
       float idw = float(i / blur_w);
       vec2 v1 = vec2(pos.x + miw, pos.y + idw);
       vec2 v2 = vec2(pos.x - miw, pos.y + idw);
       vec2 v3 = vec2(pos.x + miw, pos.y - idw);
       vec2 v4 = vec2(pos.x - miw, pos.y - idw);
       gws = gws + texture2D(uSampler, v1 / vec2(dimensions)) * weight * strength;
       gws = gws + texture2D(uSampler, v2 / vec2(dimensions)) * weight * strength;
       gws = gws + texture2D(uSampler, v3 / vec2(dimensions)) * weight * strength;
       gws = gws + texture2D(uSampler, v4 / vec2(dimensions)) * weight * strength;
   }
   gl_FragColor.rgba = col + gws;
}