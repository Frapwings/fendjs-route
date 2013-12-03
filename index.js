/**
 * Import(s)
 */

var toRegexp = require('path-to-regexp');
var type = (typeof window !== 'undefined' && window !== null)
         ? require('type') : require('type-component');

/**
 * Export(s)
 */

module.exports = Route;

/**
 * Initialize a route with the given `path`,
 * and an array of `callbacks` and `options`.
 * 
 * Options:
 *
 *   - `sensitive`    enable case-sensitive routes
 *   - `strict`       enable strict matching for trailing slashes
 *
 * @param {String|Regexp} path
 * @param {Array} callbacks
 * @param {Object} options.
 * @api public
 */

function Route(path, callbacks, options) {
  if (type(callbacks) === 'object') {
    options = callbacks;
    callbacks = undefined;
  }
  this.path = path;
  this.keys = [];
  this.callbacks = callbacks;
  this.regexp = toRegexp(path, this.keys, options);
}

/**
 * Check if `path` matches this route,
 * returning `false` or an object.
 *
 * @param {String} path
 * @return {Object}
 * @api public
 */

Route.prototype.match = function (path) {
  var keys = this.keys;
  var qsIndex = path.indexOf('?');
  var pathname = ~qsIndex ? path.slice(0, qsIndex) : path;
  var m = this.regexp.exec(pathname);
  var params = [];
  var args = [];

  if (!m) return false;

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];

    var val = 'string' == type(m[i])
      ? decodeURIComponent(m[i])
      : m[i];

    if (key) {
      params[key.name] = undefined !== params[key.name]
        ? params[key.name]
        : val;
    } else {
      params.push(val);
    }

    args.push(val);
  }

  params.args = args;
  return params;
};
