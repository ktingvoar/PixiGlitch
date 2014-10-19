PixiGlitch
==========
A port of Maxilla's [ofxPostGlitch](https://github.com/maxillacult/ofxPostGlitch) for openFrameworks to Good Boy Digital's rather awesome [pixi.js](https://github.com/GoodBoyDigital/pixi.js).

Get a feel for what you can do by watching Maxilla's demo:
[http://vimeo.com/58698980](http://vimeo.com/58698980)

Or twiddle the dials on [this example](https://cdn.rawgit.com/ktingvoar/PixiGlitch/master/examples/dashboard/index.html).

#What you get
A bunch of pixi.js filters roughly sliced into two categories.

## Glitch filters
- Convergence
- Glow
- Shaker
- CutSlider
- Twist
- Outline
- Noise
- SlitScan
- Swell
- Invert

## Colour remap filters
- HighContrast
- BlueRaise
- RedRaise
- GreenRaise
- BlueInvert
- RedInvert
- GreenInvert

#Notes
- In general I've tried to remain true to the naming conventions in the original Maxilla shaders. They're a little bit nondescript - but hey, it's glitch right? Play with them and see what happens.
- Filters in pixi are basically fragment shaders with some varyings/uniforms exposed via some pixi.js code. TL;DR they only work with WebGL contexts.

#Todo/Things I won't get around to
- Build scripts.
- Some basic docs describing each filter and its properties.
- Rename properties to be a little more helpful.
- More basic examples.