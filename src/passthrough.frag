precision mediump float;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;
void main (void){
  vec4 col = texture2D(uSampler, vTextureCoord);
  gl_FragColor.rgba = col.rgba;
}