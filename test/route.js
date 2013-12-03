var Route = (typeof window !== 'undefined' && window !== null) 
  ? require('fendjs-route') : require(process.env.FENDJS_ROUTE ? '../lib-cov/' : '../');
var assert = require('assert');

describe('Route(path, [callbacks], [options])', function () {
  it('should create `Route` object', function () {
    var route1 = new Route('/user/');
    assert(route1);
    assert(undefined === route1.callbacks);
    assert(route1.regexp);

    var callbacks = [];
    var route2 = new Route('/user/', callbacks);
    assert(route2);
    assert(callbacks, route2.callbacks);
    assert(route2.regexp);

    var route3 = new Route('/user/', callbacks, {});
    assert(route3);
    assert(callbacks, route3.callbacks);
    assert(route3.regexp);
  });
});

describe('Route#match(path)', function () {
  it('should match paths and return matches', function () {
    var route = new Route('/user/:id/posts/:pid');

    assert(false == route.match('/something'));
    assert(false == route.match('/user/123'));

    var ret = route.match('/user/12/posts/1');
    assert('12' == ret.id);
    assert('1' == ret.pid);

    ret = route.match('/USER/12/posts/1');
    assert('12' == ret.id);
    assert('1' == ret.pid);

    ret = route.match('/user/12/posts/1/');
    assert('12' == ret.id);
    assert('1' == ret.pid);
  });

  it('should support wildcards', function () {
    var route = new Route('/file/*');
    var ret = route.match('/file/js/jquery.js');
    assert('js/jquery.js' == ret[0]);
  });

  it('should pass through regexps', function () {
    var route = new Route(/^\/foo/);
    assert(route.match('/foo'));
    assert(false == route.match('/bar'));
  });

  it('should ignore querystrings', function () {
    var route = new Route('/user/:id/posts/:pid');

    assert(false == route.match('/something?hey'));

    var ret = route.match('/user/12/posts/1?something=here');
    assert('12' == ret.id);
    assert('1' == ret.pid);
  });

  it('should decode the params', function () {
    var route = new Route('/user/:name');
    var ret = route.match('/user/kazuya%20kawaguchi');
    assert('kazuya kawaguchi' == ret.name);
  });

  it('should populate .args array', function () {
    var route = new Route('/user/:id/files/*');
    var ret = route.match('/user/4/files/js/jquery.js');
    assert('4' == ret.args[0]);
    assert('js/jquery.js' == ret.args[1]);
  });

  describe('sensitive option', function () {
    it('should match paths', function () {
      var route = new Route('/user', { sensitive: true });

      assert(route.match('/user'));
      assert(false== route.match('/uSer'));
    });
  });

  describe('strict option', function () {
    it('should match paths', function () {
      var route = new Route('/user', { strict: true });

      assert(route.match('/user'));
      assert(false == route.match('/user/'));
    });
  });
});
