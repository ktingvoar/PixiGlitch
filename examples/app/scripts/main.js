'use strict';
(function() {

  //var COOL_COLOURS = [0xffffff, 0x000000, 0xff1bc6, 0x7cff1b, 0xffcc1b, 0x1bc7ff];
  //var COOL_COLOURS = [0xffffff, 0xffffff, 0xeeeeee, 0xcccccc, 0x999999, 0x555555, 0x777777];
  var COOL_COLOURS = [0xffffff, 0x000000];

  var view = document.getElementById('pixi-view');
  var stage = new PIXI.Stage(0xFFFFFF, true);
  var container = new PIXI.DisplayObjectContainer();
  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  // fire up pixi
  var renderer = new PIXI.WebGLRenderer(width, height, view);

  // our test display objects
  var square = null;
  var squares = [];
  var counter = 0;

  var whiteBg = new PIXI.Graphics();
  whiteBg.beginFill(0xffffff, 1);
  whiteBg.drawRect(0, 0, width * 0.5, height);
  container.addChild(whiteBg);

  var blackBg = new PIXI.Graphics();
  blackBg.beginFill(0, 1);
  blackBg.drawRect(0, 0, width * 0.5, height);
  blackBg.x = width * 0.5;
  container.addChild(blackBg);

  // create them - a bunch of squares all random
  for (var i = 0; i < 500; i++) {
    var side = (Math.exp(Math.random()) - 1) * 150;
    square = new PIXI.Graphics();
    square.beginFill(COOL_COLOURS[Math.floor(Math.random() * COOL_COLOURS.length)]);
    square.drawRect(side * -0.5, side * -0.5, side, side);
    square.position.x = (Math.random() * width * 3) - width;
    square.position.y = (Math.random() * height * 3) - height;
    square.rotation = Math.random() * Math.PI * 2;
    //square.filters = [filter];
    //square.blendMode = PIXI.blendModes.MULTIPLY;
    squares.push({square: square, side: side, numSteps: Math.random() * 500});
    container.addChild(square);
  }
  stage.addChild(container);
    container.filters = [new PIXI_GLITCH.BlueRaiseFilter(), new PIXI_GLITCH.NoiseFilter()];
  //container.filters = [ new PIXI.GlowFilter()];
 //container.filters = [/*new PIXI.TwistFilter(), new PIXI.NoiseFilter()*//*, new PIXI.ConvergenceFilter()*/];
  //container.filters = [new PIXI.ConvergenceFilter(), new PIXI.CutSliderFilter(),  new PIXI.BlueRaiseFilter()];

  function step() {
    var square = null;
    var side = null;
    var numSteps = null;
    container.filters[1].uniforms.rand.value = Math.random();
 /*   if (Math.random() > 0.85) {
      container.filters[1].uniforms.rand.value = Math.random() * 1.5;
    }*/
/*    if (Math.random() > 0.95) {
      container.filters[1].uniforms.val2.value = Math.random() * 100;
      container.filters[1].uniforms.val3.value = Math.random() * 200;
      container.filters[1].uniforms.rand.value = Math.random() * 1;
    }
    container.filters[1].uniforms.timer.value = counter * 0.05;*/

/*    if (Math.random() > 0.85) {
      container.filters[1].uniforms.rand.value = Math.random() - 0.25;
      container.filters[1].uniforms.val1.value = Math.random() * 100;
      container.filters[1].uniforms.val2.value = Math.random() * 100;
    }*/
    if (Math.random() > 0.92) {
      //if (Math.random() > 0.9) {

       // container.filters[0].uniforms.rand.value = Math.random() * 50;
      //} else {
        //container.filters[0].uniforms.rand.value = Math.random() * 20;
      //}
    } else {
      //container.filters[0].uniforms.rand.value = Math.random() * 5;
    }
    for (var i = 0; i < squares.length; i++) {
      square = squares[i].square;
      side = squares[i].side;
      numSteps = squares[i].numSteps;
      square.position.x += Math.cos(numSteps * 0.002) * side * 0.025;
      square.position.y += Math.cos(numSteps * 0.02) * side * 0.025;
      square.rotation += Math.cos(numSteps * 0.01) * 0.01;
      squares[i].numSteps++;
    }
    renderer.render(stage);
    counter++;
    window.requestAnimationFrame(step);
  }

  step();

}());


