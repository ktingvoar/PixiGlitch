/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function BlueRaiseFilter() {
    PIXI.AbstractFilter.call(this,

    null,

    fs.readFileSync(__dirname + '/blueraise.frag', 'utf8'));
};

BlueRaiseFilter.prototype = Object.create(core.AbstractFilter.prototype);
BlueRaiseFilter.prototype.constructor = BlueRaiseFilter;

module.exports = BlueRaiseFilter;
