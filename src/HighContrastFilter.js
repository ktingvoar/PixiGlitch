/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function HighContrastFilter() {
    PIXI.AbstractFilter.call(this,

    null,

      fs.readFileSync(__dirname + '/highcontrast.frag', 'utf8'));

};

HighContrastFilter.prototype = Object.create(core.AbstractFilter.prototype);
HighContrastFilter.prototype.constructor = HighContrastFilter;

module.exports = HighContrastFilter;
