4.1.0 / 2019-03-08
==================

  * Updating docs for pollTaskFor (#375)
  * Updates pollTaskFor to correctly await settled (#374)

v4.0.0 / 2019-03-04
==================

  * Lifeline's minimum node version is 8
  * Fixing TS errors related to handlebars types
  * Updating blueprint to latest
  * Updating param name and docs for poll
  * Implements early return when \*Task functions called on destroyed objects

  * Fixes for issues #35 and #120
  * Fixes for issues #130 and #168

v3.1.0 / 2018-12-21
====================
  * Modified `throttleTask` to accept arguments to be passed to throttled method
  * Made `spacing` arguments required for `throttleTask` and `debounceTask` respectively

v3.0.4 / 2018-06-01
==================

  * Updated dependencies to latest versions, including Ember 3.1.2 and Ember CLI 3.1.4
  * PR - Clean up canceled pending debounce by 2hu12

v3.0.0 / 2018-03-12
==================

  * Instance arrays for tracking task and event dependencies for objects deprecated in favor of using
    WeakMaps to track the association and eventual tear down of resources
  * APIs expanded to include functional counterparts
  * Mixin surface area reduced in favor of delegating to functional equivalent

v2.0.0 / 2017-11-16
==================

  * New feature - `scheduleTask` - allows for scheduling tasks via lifeline
  * New feature - `registerDisposable` - registers a function to be called on destruction of the object
  * Allow calling `addEventListener` from objects other than components (when passing specific `HTMLElement`).
  * Ensure `this.throttleTask` created timers are cleared upon destroy.
  * Upgrade to use Ember's new JS modules API. 🎉
  * Removed ability to add multiple listeners to child elements in single call
  * Removed dependency on jQuery for ContextBoundEventListenersMixin

v1.3.0 / 2017-06-30
==================

  * Introduce cancel\* methods

v1.2.1 / 2017-06-30
==================

  * Moving arrays to be lazy-allocated

v1.1.0 / 2017-06-15
===================

  * Fixing deprecation issue with lookupFactory
  * [Bugfix] - Adding assertions to ensure _super has been called in the init chain
  * destruct from ember instead of depending on ember-cli-shims

v1.0.4 / 2017-02-07
===================

  * Added removeEventListener method to DomMixin
  * Refactor DOM mixin tests to use standard setup.

v1.0.3 / 2016-10-31
===================

  * Released v1.0.3

v1.0.2 / 2016-10-31
===================

  * Released v1.0.2

v1.0.1 / 2016-10-31
===================

  * Released v1.0.1

v1.0.0 / 2016-10-31
===================

  * Add DOM helper methods.
  * Add implementation for run based helper methods.