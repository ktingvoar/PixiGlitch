/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function RedInvertFilter() {
    core.AbstractFilter.call(this,
      
      null,

      fs.readFileSync(__dirname + '/redinvert.frag', 'utf8'));


};

RedInvertFilter.prototype = Object.create(core.AbstractFilter.prototype);
RedInvertFilter.prototype.constructor = RedInvertFilter;

module.exports = RedInvertFilter;

