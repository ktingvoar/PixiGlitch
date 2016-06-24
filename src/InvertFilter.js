/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function InvertFilter() {
    core.AbstractFilter.call(this,
    
    null,

    fs.readFileSync(__dirname + '/noise.frag', 'utf8')
    );

};

InvertFilter.prototype = Object.create(core.AbstractFilter.prototype);
InvertFilter.prototype.constructor = InvertFilter;

module.exports = InvertFilter;
