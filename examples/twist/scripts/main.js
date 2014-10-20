'use strict';
(function () {

    //var COOL_COLOURS = [0xffffff, 0x000000, 0xff1bc6, 0x7cff1b, 0xffcc1b, 0x1bc7ff];
    var COOL_COLOURS = [0xffffff, 0xffffff, 0xeeeeee, 0xcccccc, 0x999999, 0x555555, 0x777777];
    //var COOL_COLOURS = [0xffffff, 0x000000];

    var view = document.getElementById('pixi-view');
    var stage = new PIXI.Stage(0xFFFFFF, true);
    var container = new PIXI.DisplayObjectContainer();
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    // fire up pixi
    var renderer = new PIXI.WebGLRenderer(width, height, view);
    var twistFilter = new PIXI_GLITCH.TwistFilter();
    var blueRaiseFilter = new PIXI_GLITCH.BlueRaiseFilter();
    var convergenceFilter = new PIXI_GLITCH.ConvergenceFilter();

    // our test display objects
    var square = null;
    var squares = [];
    var steps = 500;
    var i = 0;

    // some Multipliers
    var timerMA = 0;
    var randMA = 0;
    var randMB = 0;
    var val2MA = 0;
    var val2MB = 0;
    var val3MA = 0;
    var val3MB = 0;
    randomiseMultipliers();

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
    for (i = 0; i < 500; i++) {
        var sideLength = (Math.exp(Math.random()) - 1) * 100;
        square = new PIXI.Graphics();
        square.beginFill(COOL_COLOURS[Math.floor(Math.random() * COOL_COLOURS.length)]);
        square.drawRect(sideLength * -0.5, sideLength * -0.5, sideLength, sideLength);
        square.position.x = (Math.random() * width * 3) - width;
        square.position.y = (Math.random() * height * 3) - height;
        square.rotation = Math.random() * Math.PI * 2;
        squares.push({
            square: square,
            sideLength: sideLength,
            counter: Math.random() * 1000 - 500
        });
        container.addChild(square);
    }
    stage.addChild(container);
    container.filters = [twistFilter, convergenceFilter, blueRaiseFilter];

    function randomiseMultipliers() {
        timerMA = Math.random() * 0.05;
        randMA = Math.random() * 0.001;
        randMB = Math.random() * 10 + 10;
        val2MA = Math.random() * 0.0001;
        val2MB = Math.random() * 200 + 150;
        val3MA = Math.random() * 0.0003;
        val3MB = Math.random() * 500 + 200;
    }

    function flattenMultipliers() {
        randMA = 0;
        randMB = 0;
        val2MA = 0;
        val2MB = 0;
        val3MA = 0;
        val3MB = 0;
    }

    // animate
    function step() {
        var square = null;
        var sideLength = null;
        var counter = null;

        twistFilter.timer = steps * timerMA;
        twistFilter.rand = Math.sin(steps * randMA) * randMB;
        twistFilter.val2 = Math.sin(steps * val2MA) * val2MB;
        twistFilter.val3 = Math.sin(steps * val3MA) * val3MB;

        if (Math.random() > 0.95) randomiseMultipliers();
        if (Math.random() > 0.97) flattenMultipliers();

        // move our squares around the screen all trippy and floaty and trigonometry
        for (i = 0; i < squares.length; i++) {
            square = squares[i].square;
            sideLength = squares[i].sideLength;
            counter = squares[i].counter++;
            square.position.x += Math.sin(counter * 0.002) * sideLength * 0.015;
            square.position.y += Math.sin(counter * 0.002) * sideLength * 0.015;
            square.rotation += Math.sin(counter * 0.01) * 0.01;
        }

        renderer.render(stage);
        steps ++;
        window.requestAnimationFrame(step);
    }

    step();

}());


