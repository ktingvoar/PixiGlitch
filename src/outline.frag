precision mediump float;
uniform sampler2D uSampler;
uniform vec4 dimensions;
varying vec2 vTextureCoord;
const int step = 5;
void main (void)
{
   vec2 pos = vTextureCoord * vec2(dimensions);
   vec4 cols[25];
   for (int i = 0; i < step; i++) {
       for (int j = 0; j < step; j++) {
           vec2 coord = vec2((pos.x + float(j) - 1.0), (pos.y + float(i) - 1.0)) / vec2(dimensions);
           cols[i * step + j] = texture2D(uSampler, coord);
           cols[i * step + j].r = (cols[i * step + j].r + cols[i * step + j].g + cols[i * step + j].b) / 3.0;
       }
   }
   float mn = 1.0, mx = 0.0;
   for (int i = 0; i < step * step; i++){
       mn = min(cols[i].r, mn);
       mx = max(cols[i].r, mx);
   }
   float dst = abs(1.0 - (mx - mn));
   gl_FragColor.a = 1.0;
   gl_FragColor.rgb = vec3(dst, dst, dst) + cols[12].rgb;
}