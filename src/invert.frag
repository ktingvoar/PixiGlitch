precision mediump float;
uniform sampler2D uSampler;
uniform bool enabled;
varying vec2 vTextureCoord;
void main (void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord);
   gl_FragColor.r = 1.0 - gl_FragColor.r;
   gl_FragColor.g = 1.0 - gl_FragColor.g;
   gl_FragColor.b = 1.0 - gl_FragColor.b;
}