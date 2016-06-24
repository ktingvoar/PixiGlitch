/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function GreenInvertFilter() {
    PIXI.AbstractFilter.call(this,

    null,

    fs.readFileSync(__dirname + '/greeninvert.frag', 'utf8'));

};

GreenInvertFilter.prototype = Object.create(core.AbstractFilter.prototype);
GreenInvertFilter.prototype.constructor = GreenInvertFilter;

module.exports = GreenInvertFilter;