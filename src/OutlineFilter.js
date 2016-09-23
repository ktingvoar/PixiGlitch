/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function OutlineFilter() {
    PIXI.AbstractFilter.call(this,
    
    null,

    fs.readFileSync(__dirname + '/outline.frag', 'utf8'),

    {
        dimensions: {type: '4fv', value: [0, 0, 0, 0]}
    }
    );

};

OutlineFilter.prototype = Object.create(core.AbstractFilter.prototype);
OutlineFilter.prototype.constructor = OutlineFilter;

module.exports = OutlineFilter; 
