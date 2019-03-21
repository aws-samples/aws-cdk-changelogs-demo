4.14.0 / 2016-06-16
===================

  * Add `acceptRanges` option to `res.sendFile`/`res.sendfile`
  * Add `cacheControl` option to `res.sendFile`/`res.sendfile`
  * Add `options` argument to `req.range`
    - Includes the `combine` option
  * Encode URL in `res.location`/`res.redirect` if not already encoded
  * Fix some redirect handling in `res.sendFile`/`res.sendfile`
  * Fix Windows absolute path check using forward slashes
  * Improve error with invalid arguments to `req.get()`
  * Improve performance for `res.json`/`res.jsonp` in most cases
  * Improve `Range` header handling in `res.sendFile`/`res.sendfile`
  * deps: accepts@~1.3.3
    - Fix including type extensions in parameters in `Accept` parsing
    - Fix parsing `Accept` parameters with quoted equals
    - Fix parsing `Accept` parameters with quoted semicolons
    - Many performance improvments
    - deps: mime-types@~2.1.11
    - deps: negotiator@0.6.1
  * deps: content-type@~1.0.2
    - perf: enable strict mode
  * deps: cookie@0.3.1
    - Add `sameSite` option
    - Fix cookie `Max-Age` to never be a floating point number
    - Improve error message when `encode` is not a function
    - Improve error message when `expires` is not a `Date`
    - Throw better error for invalid argument to parse
    - Throw on invalid values provided to `serialize`
    - perf: enable strict mode
    - perf: hoist regular expression
    - perf: use for loop in parse
    - perf: use string concatination for serialization
  * deps: finalhandler@0.5.0
    - Change invalid or non-numeric status code to 500
    - Overwrite status message to match set status code
    - Prefer `err.statusCode` if `err.status` is invalid
    - Set response headers from `err.headers` object
    - Use `statuses` instead of `http` module for status messages
  * deps: proxy-addr@~1.1.2
    - Fix accepting various invalid netmasks
    - Fix IPv6-mapped IPv4 validation edge cases
    - IPv4 netmasks must be contingous
    - IPv6 addresses cannot be used as a netmask
    - deps: ipaddr.js@1.1.1
  * deps: qs@6.2.0
    - Add `decoder` option in `parse` function
  * deps: range-parser@~1.2.0
    - Add `combine` option to combine overlapping ranges
    - Fix incorrectly returning -1 when there is at least one valid range
    - perf: remove internal function
  * deps: send@0.14.1
    - Add `acceptRanges` option
    - Add `cacheControl` option
    - Attempt to combine multiple ranges into single range
    - Correctly inherit from `Stream` class
    - Fix `Content-Range` header in 416 responses when using `start`/`end` options
    - Fix `Content-Range` header missing from default 416 responses
    - Fix redirect error when `path` contains raw non-URL characters
    - Fix redirect when `path` starts with multiple forward slashes
    - Ignore non-byte `Range` headers
    - deps: http-errors@~1.5.0
    - deps: range-parser@~1.2.0
    - deps: statuses@~1.3.0
    - perf: remove argument reassignment
  * deps: serve-static@~1.11.1
    - Add `acceptRanges` option
    - Add `cacheControl` option
    - Attempt to combine multiple ranges into single range
    - Fix redirect error when `req.url` contains raw non-URL characters
    - Ignore non-byte `Range` headers
    - Use status code 301 for redirects
    - deps: send@0.14.1
  * deps: type-is@~1.6.13
    - Fix type error when given invalid type to match against
    - deps: mime-types@~2.1.11
  * deps: vary@~1.1.0
    - Only accept valid field names in the `field` argument
  * perf: use strict equality when possible

4.13.4 / 2016-01-21
===================

  * deps: content-disposition@0.5.1
    - perf: enable strict mode
  * deps: cookie@0.1.5
    - Throw on invalid values provided to `serialize`
  * deps: depd@~1.1.0
    - Support web browser loading
    - perf: enable strict mode
  * deps: escape-html@~1.0.3
    - perf: enable strict mode
    - perf: optimize string replacement
    - perf: use faster string coercion
  * deps: finalhandler@0.4.1
    - deps: escape-html@~1.0.3
  * deps: merge-descriptors@1.0.1
    - perf: enable strict mode
  * deps: methods@~1.1.2
    - perf: enable strict mode
  * deps: parseurl@~1.3.1
    - perf: enable strict mode
  * deps: proxy-addr@~1.0.10
    - deps: ipaddr.js@1.0.5
    - perf: enable strict mode
  * deps: range-parser@~1.0.3
    - perf: enable strict mode
  * deps: send@0.13.1
    - deps: depd@~1.1.0
    - deps: destroy@~1.0.4
    - deps: escape-html@~1.0.3
    - deps: range-parser@~1.0.3
  * deps: serve-static@~1.10.2
    - deps: escape-html@~1.0.3
    - deps: parseurl@~1.3.0
    - deps: send@0.13.1

4.13.3 / 2015-08-02
===================

  * Fix infinite loop condition using `mergeParams: true`
  * Fix inner numeric indices incorrectly altering parent `req.params`

4.13.2 / 2015-07-31
===================

  * deps: accepts@~1.2.12
    - deps: mime-types@~2.1.4
  * deps: array-flatten@1.1.1
    - perf: enable strict mode
  * deps: path-to-regexp@0.1.7
    - Fix regression with escaped round brackets and matching groups
  * deps: type-is@~1.6.6
    - deps: mime-types@~2.1.4

4.13.1 / 2015-07-05
===================

  * deps: accepts@~1.2.10
    - deps: mime-types@~2.1.2
  * deps: qs@4.0.0
    - Fix dropping parameters like `hasOwnProperty`
    - Fix various parsing edge cases
  * deps: type-is@~1.6.4
    - deps: mime-types@~2.1.2
    - perf: enable strict mode
    - perf: remove argument reassignment

4.13.0 / 2015-06-20
===================

  * Add settings to debug output
  * Fix `res.format` error when only `default` provided
  * Fix issue where `next('route')` in `app.param` would incorrectly skip values
  * Fix hiding platform issues with `decodeURIComponent`
    - Only `URIError`s are a 400
  * Fix using `*` before params in routes
  * Fix using capture groups before params in routes
  * Simplify `res.cookie` to call `res.append`
  * Use `array-flatten` module for flattening arrays
  * deps: accepts@~1.2.9
    - deps: mime-types@~2.1.1
    - perf: avoid argument reassignment & argument slice
    - perf: avoid negotiator recursive construction
    - perf: enable strict mode
    - perf: remove unnecessary bitwise operator
  * deps: cookie@0.1.3
    - perf: deduce the scope of try-catch deopt
    - perf: remove argument reassignments
  * deps: escape-html@1.0.2
  * deps: etag@~1.7.0
    - Always include entity length in ETags for hash length extensions
    - Generate non-Stats ETags using MD5 only (no longer CRC32)
    - Improve stat performance by removing hashing
    - Improve support for JXcore
    - Remove base64 padding in ETags to shorten
    - Support "fake" stats objects in environments without fs
    - Use MD5 instead of MD4 in weak ETags over 1KB
  * deps: finalhandler@0.4.0
    - Fix a false-positive when unpiping in Node.js 0.8
    - Support `statusCode` property on `Error` objects
    - Use `unpipe` module for unpiping requests
    - deps: escape-html@1.0.2
    - deps: on-finished@~2.3.0
    - perf: enable strict mode
    - perf: remove argument reassignment
  * deps: fresh@0.3.0
    - Add weak `ETag` matching support
  * deps: on-finished@~2.3.0
    - Add defined behavior for HTTP `CONNECT` requests
    - Add defined behavior for HTTP `Upgrade` requests
    - deps: ee-first@1.1.1
  * deps: path-to-regexp@0.1.6
  * deps: send@0.13.0
    - Allow Node.js HTTP server to set `Date` response header
    - Fix incorrectly removing `Content-Location` on 304 response
    - Improve the default redirect response headers
    - Send appropriate headers on default error response
    - Use `http-errors` for standard emitted errors
    - Use `statuses` instead of `http` module for status messages
    - deps: escape-html@1.0.2
    - deps: etag@~1.7.0
    - deps: fresh@0.3.0
    - deps: on-finished@~2.3.0
    - perf: enable strict mode
    - perf: remove unnecessary array allocations
  * deps: serve-static@~1.10.0
    - Add `fallthrough` option
    - Fix reading options from options prototype
    - Improve the default redirect response headers
    - Malformed URLs now `next()` instead of 400
    - deps: escape-html@1.0.2
    - deps: send@0.13.0
    - perf: enable strict mode
    - perf: remove argument reassignment
  * deps: type-is@~1.6.3
    - deps: mime-types@~2.1.1
    - perf: reduce try block size
    - perf: remove bitwise operations
  * perf: enable strict mode
  * perf: isolate `app.render` try block
  * perf: remove argument reassignments in application
  * perf: remove argument reassignments in request prototype
  * perf: remove argument reassignments in response prototype
  * perf: remove argument reassignments in routing
  * perf: remove argument reassignments in `View`
  * perf: skip attempting to decode zero length string
  * perf: use saved reference to `http.STATUS_CODES`

4.12.4 / 2015-05-17
===================

  * deps: accepts@~1.2.7
    - deps: mime-types@~2.0.11
    - deps: negotiator@0.5.3
  * deps: debug@~2.2.0
    - deps: ms@0.7.1
  * deps: depd@~1.0.1
  * deps: etag@~1.6.0
    - Improve support for JXcore
    - Support "fake" stats objects in environments without `fs`
  * deps: finalhandler@0.3.6
    - deps: debug@~2.2.0
    - deps: on-finished@~2.2.1
  * deps: on-finished@~2.2.1
    - Fix `isFinished(req)` when data buffered
  * deps: proxy-addr@~1.0.8
    - deps: ipaddr.js@1.0.1
  * deps: qs@2.4.2
   - Fix allowing parameters like `constructor`
  * deps: send@0.12.3
    - deps: debug@~2.2.0
    - deps: depd@~1.0.1
    - deps: etag@~1.6.0
    - deps: ms@0.7.1
    - deps: on-finished@~2.2.1
  * deps: serve-static@~1.9.3
    - deps: send@0.12.3
  * deps: type-is@~1.6.2
    - deps: mime-types@~2.0.11

4.12.3 / 2015-03-17
===================

  * deps: accepts@~1.2.5
    - deps: mime-types@~2.0.10
  * deps: debug@~2.1.3
    - Fix high intensity foreground color for bold
    - deps: ms@0.7.0
  * deps: finalhandler@0.3.4
    - deps: debug@~2.1.3
  * deps: proxy-addr@~1.0.7
    - deps: ipaddr.js@0.1.9
  * deps: qs@2.4.1
    - Fix error when parameter `hasOwnProperty` is present
  * deps: send@0.12.2
    - Throw errors early for invalid `extensions` or `index` options
    - deps: debug@~2.1.3
  * deps: serve-static@~1.9.2
    - deps: send@0.12.2
  * deps: type-is@~1.6.1
    - deps: mime-types@~2.0.10

4.12.2 / 2015-03-02
===================

  * Fix regression where `"Request aborted"` is logged using `res.sendFile`

4.12.1 / 2015-03-01
===================

  * Fix constructing application with non-configurable prototype properties
  * Fix `ECONNRESET` errors from `res.sendFile` usage
  * Fix `req.host` when using "trust proxy" hops count
  * Fix `req.protocol`/`req.secure` when using "trust proxy" hops count
  * Fix wrong `code` on aborted connections from `res.sendFile`
  * deps: merge-descriptors@1.0.0

4.12.0 / 2015-02-23
===================

  * Fix `"trust proxy"` setting to inherit when app is mounted
  * Generate `ETag`s for all request responses
    - No longer restricted to only responses for `GET` and `HEAD` requests
  * Use `content-type` to parse `Content-Type` headers
  * deps: accepts@~1.2.4
    - Fix preference sorting to be stable for long acceptable lists
    - deps: mime-types@~2.0.9
    - deps: negotiator@0.5.1
  * deps: cookie-signature@1.0.6
  * deps: send@0.12.1
    - Always read the stat size from the file
    - Fix mutating passed-in `options`
    - deps: mime@1.3.4
  * deps: serve-static@~1.9.1
    - deps: send@0.12.1
  * deps: type-is@~1.6.0
    - fix argument reassignment
    - fix false-positives in `hasBody` `Transfer-Encoding` check
    - support wildcard for both type and subtype (`*/*`)
    - deps: mime-types@~2.0.9

4.11.2 / 2015-02-01
===================

  * Fix `res.redirect` double-calling `res.end` for `HEAD` requests
  * deps: accepts@~1.2.3
    - deps: mime-types@~2.0.8
  * deps: proxy-addr@~1.0.6
    - deps: ipaddr.js@0.1.8
  * deps: type-is@~1.5.6
    - deps: mime-types@~2.0.8

4.11.1 / 2015-01-20
===================

  * deps: send@0.11.1
    - Fix root path disclosure
  * deps: serve-static@~1.8.1
    - Fix redirect loop in Node.js 0.11.14
    - Fix root path disclosure
    - deps: send@0.11.1

4.11.0 / 2015-01-13
===================

  * Add `res.append(field, val)` to append headers
  * Deprecate leading `:` in `name` for `app.param(name, fn)`
  * Deprecate `req.param()` -- use `req.params`, `req.body`, or `req.query` instead
  * Deprecate `app.param(fn)`
  * Fix `OPTIONS` responses to include the `HEAD` method properly
  * Fix `res.sendFile` not always detecting aborted connection
  * Match routes iteratively to prevent stack overflows
  * deps: accepts@~1.2.2
    - deps: mime-types@~2.0.7
    - deps: negotiator@0.5.0
  * deps: send@0.11.0
    - deps: debug@~2.1.1
    - deps: etag@~1.5.1
    - deps: ms@0.7.0
    - deps: on-finished@~2.2.0
  * deps: serve-static@~1.8.0
    - deps: send@0.11.0