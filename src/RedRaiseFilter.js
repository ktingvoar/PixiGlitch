/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function RedRaiseFilter() {
    core.AbstractFilter.call(this,

      null,

      fs.readFileSync(__dirname + '/redraise.frag', 'utf8')
    );
};

RedRaiseFilter.prototype = Object.create(core.AbstractFilter.prototype);
RedRaiseFilter.prototype.constructor = RedRaiseFilter;

module.exports = RedRaiseFilter;