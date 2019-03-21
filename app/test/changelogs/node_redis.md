Changelog
=========

## v.2.6.2 - 16 Jun, 2016

Bugfixes

-  Fixed individual callbacks of a transaction not being called (2.6.0 regression)

## v.2.6.1 - 02 Jun, 2016

Bugfixes

-  Fixed invalid function name being exported

## v.2.6.0 - 01 Jun, 2016

In addition to the pre-releases the following changes exist in v.2.6.0:

Features

-  Updated [redis-parser](https://github.com/NodeRedis/node-redis-parser) dependency ([changelog](https://github.com/NodeRedis/node-redis-parser/releases/tag/v.2.0.0))
 -  The JS parser is from now on the new default as it is a lot faster than the hiredis parser
 -  This is no BC as there is no changed behavior for the user at all but just a performance improvement. Explicitly requireing the Hiredis parser is still possible.
-  Added name property to all Redis functions (Node.js >= 4.0)
-  Improved stack traces in development and debug mode

Bugfixes

-  Reverted support for `__proto__` (v.2.6.0-2) to prevent and breaking change

Deprecations

-  The `parser` option is deprecated and should be removed. The built-in Javascript parser is a lot faster than the hiredis parser and has more features
