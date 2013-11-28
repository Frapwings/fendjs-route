# fendjs-route

Fundamental of router for Fend.js.

# Installation

## npm

```
$ npm install fendjs-route
```

## component

```
$ component install Frapwings/fendjs-route
```

# API

## Route(path)

Initialize a `Route` with a `path` string or regexp.

## Route#before(fn)

Add before `fn` used when the "page" is shown. This may be invoked any number of times.

## Route#after(fn)

Assign after `fn` used to perform cleanup when an alternate "page" is shown. This may be invoked any number of times.

## Route#call(type, [args])

Invoke callbacks of `type` with `args` array.

## Route#match(path)

Match against the given `path`. Returns `false` or an array with params matched.

# Testing

```
$ npm install
$ make test
```

# License

[MIT license](http://www.opensource.org/licenses/mit-license.php).

See the `LICENSE`.
