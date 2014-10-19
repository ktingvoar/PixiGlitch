PixiGlitch
==========
Port of Maxilla's [ofxPostGlitch](https://github.com/maxillacult/ofxPostGlitch) for openFrameworks to Good Boy Digital's rather awesome [pixi.js](https://github.com/GoodBoyDigital/pixi.js).

Get a feel for what you can do by watching Maxilla's demo:
[http://vimeo.com/58698980](http://vimeo.com/58698980)

Or twiddle the dials on this [example](http://htmlpreview.github.io/?github.com/ktingvoar/PixiGlitch/blob/master/examples/app/index.html)

#What You Get:
A bunch of pixi.js filters roughly sliced into two categories.

## Glitch FXs
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

## Color remap FXs
- HighContrast
- BlueRaise
- RedRaise
- GreenRaise
- BlueInvert
- RedInvert
- GreenInvert

#Notes
- In general I've tried to remain true to the naming conventions in the original Maxilla shaders. They're a little bit nondescript - but hey - glitching is by its nature a random thingy - so play with them and see what happens.
- Filters in pixi are basically fragment shaders with some varyings exposed via some pixi.js code. TL;DR they only work with WebGL contexts.

#Todo/Things I won't get around to
- Some basic docs describing each filter and its properties.
- Rename properties to be a little more helpful.
- More basic examples.