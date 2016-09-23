/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function GreenRaiseFilter() {
    PIXI.AbstractFilter.call(this,

    null,

    fs.readFileSync(__dirname + '/greenraise.frag', 'utf8'));

};

GreenRaiseFilter.prototype = Object.create(core.AbstractFilter.prototype);
GreenRaiseFilter.prototype.constructor = GreenRaiseFilter;

module.exports = GreenRaiseFilter;
