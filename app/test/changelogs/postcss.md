# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 5.1.2
* Suggests SCSS/Less parsers on parse errors depends on file extension.

## 5.1.1
* Fix TypeScript definitions (by Efremov Alexey).

## 5.1 “King and President Zagan”
* Add URI in source map support (by Mark Finger).
* Add `map.from` option (by Mark Finger).
* Add `<no source>` mappings for nodes without source (by Bogdan Chadkin).
* Add function value support to `map.prev` option (by Chris Montoro).
* Add declaration value type check in shortcut creating (by 刘祺).
* `Result#warn` now returns new created warning.
* Don’t call plugin creator in `postcss.plugin` call.
* Add source maps to PostCSS ES5 build.
* Add JSDoc to PostCSS classes.
* Clean npm package from unnecessary docs.

## 5.0.21
* Fix support with input source mao with `utf8` encoding name.

## 5.0.20
* Fix between raw value parsing (by David Clark).
* Update TypeScript definitions (by Jed Mao).
* Clean fake node.source after `append(string)`.

## 5.0.19
* Fix indent-based syntaxes support.