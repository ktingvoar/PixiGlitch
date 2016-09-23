/**
 * @author Matt Smith http://gun.net.au @ktingvoar
 */
var core = require('../../node_modules/pixi.js/src/core');
// @see https://github.com/substack/brfs/issues/25
var fs = require('fs');

function PassThroughFilter()
{
  core.AbstractFilter.call(this,
    // vertex shader
    null,
    // fragment shader
    fs.readFileSync(__dirname + '/passthrough.frag', 'utf8')
  );
}

PassThroughFilter.prototype = Object.create(core.AbstractFilter.prototype);
PassThroughFilter.prototype.constructor = PassThroughFilter;


module.exports = PassThroughFilter;