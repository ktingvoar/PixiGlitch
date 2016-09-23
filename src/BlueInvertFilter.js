/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function BlueInvertFilter() {
    PIXI.AbstractFilter.call(this,
    
    null,
      
    fs.readFileSync(__dirname + '/blueinvert.frag', 'utf8'));

};

BlueInvertFilter.prototype = Object.create(core.AbstractFilter.prototype);
BlueInvertFilter.prototype.constructor = core.BlueRaiseFilter;

module.exports = BlueInvertFilter;
