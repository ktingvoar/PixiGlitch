'use strict';
(function () {

    //var COOL_COLOURS = [0xffffff, 0x000000, 0xff1bc6, 0x7cff1b, 0xffcc1b, 0x1bc7ff];
    var COOL_COLOURS = [0xffffff, 0xffffff, 0xeeeeee, 0xcccccc, 0x999999, 0x555555, 0x777777];
    //var COOL_COLOURS = [0xffffff, 0x000000];

    window.demoMode = false;

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
    var steps = 0;
    var i = 0;

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

    var filters = [
        // color filters
        {
            name: 'RedInvert',
            filter: new PIXI_GLITCH.RedInvertFilter(),
            isActive: false,
            demoModeOdds: 0.99
        },
        {
            name: 'RedRaise',
            filter: new PIXI_GLITCH.RedRaiseFilter(),
            isActive: false,
            demoModeOdds: 0.8
        },
        {
            name: 'GreenInvert',
            filter: new PIXI_GLITCH.GreenInvertFilter(),
            isActive: false,
            demoModeOdds: 0.99
        },
        {
            name: 'GreenRaise',
            filter: new PIXI_GLITCH.GreenRaiseFilter(),
            isActive: false,
            demoModeOdds: 0.6
        },
        {
            name: 'BlueInvert',
            filter: new PIXI_GLITCH.BlueInvertFilter(),
            isActive: false,
            demoModeOdds: 0.99
        },
        {
            name: 'BlueRaise',
            filter: new PIXI_GLITCH.BlueRaiseFilter(),
            isActive: false,
            demoModeOdds: 0.85
        },
        {
            name: 'Invert',
            filter: new PIXI_GLITCH.InvertFilter(),
            isActive: false,
            demoModeOdds: 0.95
        },

        // distorty filters
        {
            name: 'Convergence',
            filter: new PIXI_GLITCH.ConvergenceFilter(),
            values: [{name: 'rand', min: 0, max: 5}],
            isActive: false,
            demoModeOdds: 0.5
        },
        {
            name: 'CutSlider',
            filter: new PIXI_GLITCH.CutSliderFilter(),
            values: [{name: 'rand', min: 0, max: 20}, {name: 'val1', min: 0, max: 700}, {name: 'val2', min: 0, max: 100} ],
            isActive: false,
            demoModeOdds: 0.6
        },
        {
            name: 'Glow',
            filter: new PIXI_GLITCH.GlowFilter(),
            values: [{name: 'blur', min: 1, max: 8}],
            isActive: false,
            demoModeOdds: 0.9
        },
        {
            name: 'Outline',
            filter: new PIXI_GLITCH.OutlineFilter(),
            isActive: false,
            demoModeOdds: 0.98
        },
        {
            name: 'Shaker',
            filter: new PIXI_GLITCH.ShakerFilter(),
            values: [{name: 'blurX', min: 0, max: 20}, {name: 'blurY', min: 0, max: 20}],
            isActive: false,
            demoModeOdds: 1

        },
        {
            name: 'SlitScan',
            filter: new PIXI_GLITCH.SlitScanFilter(),
            values: [{name: 'rand', min: -100, max: 100}],
            isActive: false,
            demoModeOdds: 0.9
        },
        {
            name: 'Swell',
            filter: new PIXI_GLITCH.SwellFilter(),
            values: [{name: 'rand', min: -100, max: 100}, {name: 'timer', min: 0, max: 10000}],
            isActive: false,
            demoModeOdds: 0.9
        },
        {
            name: 'Twist',
            filter: new PIXI_GLITCH.TwistFilter(),
            values: [{name: 'rand', min: 0, max: 10}, {name: 'timer', min: 0, max: 10000}, {name: 'val2', min: 0, max: 100}, {name: 'val3', min: 0, max: 1000}],
            isActive: false,
            demoModeOdds: 0.9
        },
        {
            name: 'Noise',
            filter: new PIXI_GLITCH.NoiseFilter(),
            useAutoRand: true,
            values: [{name: 'strength', min: 0, max: 0.5}],
            isActive: false,
            demoModeOdds: 0.5
        }
    ];

    // create a bit of interface
    var gui = new dat.GUI();
    gui.add(window, 'demoMode').onChange(onDemoModeChange);
    for (i = 0; i < filters.length; i++) {
        var item = filters[i];
        var folder = gui.addFolder(item.name);
        folder.add(item, 'isActive').onChange(onIsActiveChange);
        if (item.values) {
            for (var j = 0; j < item.values.length; j++) {
                var valueItem = item.values[j];
                folder.add(item.filter, valueItem.name, valueItem.min, valueItem.max);
            }
        }
    }

    function onIsActiveChange() {
        var activeFilters = [];
        for (var i = 0; i < filters.length; i++) {
            var item = filters[i];
            if (item.isActive) {
                activeFilters.push(item.filter);
            }
        }
        container.filters = activeFilters.length ? activeFilters : null;
    }

    function onDemoModeChange(value) {
        if (!value) {
            for (i = 0; i < filters.length; i++) {
                var item = filters[i];
                item.isActive = false;
            }
            onIsActiveChange();
        }
    }

    function randomBetween(lower, upper, round) {
        var range = upper - lower;
        var rnd = Math.random() * range;
        var result = lower + rnd;
        if (round) {
            result = Math.round(result);
        }
        return result;
    }

    // animate
    function step() {
        var square = null;
        var sideLength = null;
        var counter = null;
        var item = null;

        // move our squares around the screen all trippy and floaty and trigonometry
        for (i = 0; i < squares.length; i++) {
            square = squares[i].square;
            sideLength = squares[i].sideLength;
            counter = squares[i].counter++;
            square.position.x += Math.sin(counter * 0.002) * sideLength * 0.015;
            square.position.y += Math.sin(counter * 0.002) * sideLength * 0.015;
            square.rotation += Math.sin(counter * 0.01) * 0.01;
        }

        // values that the filters might require updating on each step
        for (i = 0; i < filters.length; i++) {
            item = filters[i];
            if (item.useAutoRand) {
                item.filter.rand = Math.random();
            }
        }

        // a very clumsy demo mode
        if (window.demoMode) {
            if (Math.random() > 0.95) {
                for (i = 0; i < filters.length; i++) {
                    item = filters[i];
                    item.isActive = Math.random() > item.demoModeOdds;
                }
                onIsActiveChange();
            }
            for (i = 0; i < filters.length; i++) {
                item = filters[i];
                if (item.isActive && item.values) {
                    for (var j = 0; j < item.values.length; j++) {
                        var value = item.values[j];
                        if (Math.random() > 0.9) {
                            item.filter[value.name] = randomBetween(value.min, value.max);
                        }
                    }
                }
            }
        }


        renderer.render(stage);
        steps ++;
        window.requestAnimationFrame(step);
    }

    step();

}());


