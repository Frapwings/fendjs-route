var Route = (typeof window !== 'undefined' && window !== null) 
  ? require('fendjs-route') : require(process.env.FENDJS_ROUTE ? '../lib-cov/' : '../');
var assert = require('assert');

describe('Route#matches(path)', function(){
  it('should match paths and return matches', function(){
    var route = new Route('/user/:id/posts/:pid');

    assert(false == route.match('/something'));
    assert(false == route.match('/user/123'));

    var ret = route.match('/user/12/posts/1');
    assert('12' == ret.id);
    assert('1' == ret.pid);
  })

  it('should support wildcards', function(){
    var route = new Route('/file/*');
    var ret = route.match('/file/js/jquery.js');
    assert('js/jquery.js' == ret[0]);
  })

  it('should pass through regexps', function(){
    var route = new Route(/^\/foo/);
    assert(route.match('/foo'));
    assert(false == route.match('/bar'));
  })

  it('should ignore querystrings', function(){
    var route = new Route('/user/:id/posts/:pid');

    assert(false == route.match('/something?hey'));

    var ret = route.match('/user/12/posts/1?something=here');
    assert('12' == ret.id);
    assert('1' == ret.pid);
  })

  it('should decode the params', function(){
    var route = new Route('/user/:name');
    var ret = route.match('/user/tj%20holowaychuk');
    assert('tj holowaychuk' == ret.name);
  })

  it('should populate .args array', function(){
    var route = new Route('/user/:id/files/*');
    var ret = route.match('/user/4/files/js/jquery.js');
    assert('4' == ret.args[0]);
    assert('js/jquery.js' == ret.args[1]);
  })
})
