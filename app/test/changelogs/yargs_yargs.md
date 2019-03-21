# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.0.0"></a>
# [5.0.0](https://github.com/yargs/yargs/compare/v4.8.1...v5.0.0) (2016-08-14)


### Bug Fixes

* **default:** Remove undocumented alias of default() ([#469](https://github.com/yargs/yargs/issues/469)) ([b8591b2](https://github.com/yargs/yargs/commit/b8591b2))
* remove deprecated zh.json ([#578](https://github.com/yargs/yargs/issues/578)) ([317c62c](https://github.com/yargs/yargs/commit/317c62c))


### Features

* .help() API can now enable implicit help command ([#574](https://github.com/yargs/yargs/issues/574)) ([7645019](https://github.com/yargs/yargs/commit/7645019))
* **command:** builder function no longer needs to return the yargs instance ([#549](https://github.com/yargs/yargs/issues/549)) ([eaa2873](https://github.com/yargs/yargs/commit/eaa2873))
* add coerce api ([#586](https://github.com/yargs/yargs/issues/586)) ([1d53ccb](https://github.com/yargs/yargs/commit/1d53ccb))
* adds recommendCommands() for command suggestions ([#580](https://github.com/yargs/yargs/issues/580)) ([59474dc](https://github.com/yargs/yargs/commit/59474dc))
* apply .env() globally ([#553](https://github.com/yargs/yargs/issues/553)) ([be65728](https://github.com/yargs/yargs/commit/be65728))
* apply default builder to command() and apply fail() handlers globally ([#583](https://github.com/yargs/yargs/issues/583)) ([0aaa68b](https://github.com/yargs/yargs/commit/0aaa68b))
* interpret demand() numbers as relative to executing command ([#582](https://github.com/yargs/yargs/issues/582)) ([927810c](https://github.com/yargs/yargs/commit/927810c))
* update yargs-parser to version 3.1.0 ([#581](https://github.com/yargs/yargs/issues/581)) ([882a127](https://github.com/yargs/yargs/commit/882a127))


### Performance Improvements

* defer requiring most external libs until needed ([#584](https://github.com/yargs/yargs/issues/584)) ([f9b0ed4](https://github.com/yargs/yargs/commit/f9b0ed4))


### BREAKING CHANGES

* fail is now applied globally.
* we now default to an empty builder function when command is executed with no builder.
* yargs-parser now better handles negative integer values, at the cost of handling numeric option names, e.g., -1 hello
* default: removed undocumented `defaults` alias for `default`.
* introduces a default `help` command which outputs help, as an alternative to a help flag.



<a name="4.8.1"></a>
## [4.8.1](https://github.com/yargs/yargs/compare/v4.8.0...v4.8.1) (2016-07-16)


### Bug Fixes

* **commandDir:** make dir relative to caller instead of require.main.filename ([#548](https://github.com/yargs/yargs/issues/548)) ([3c2e479](https://github.com/yargs/yargs/commit/3c2e479))
* add config lookup for .implies() ([#556](https://github.com/yargs/yargs/issues/556)) ([8d7585c](https://github.com/yargs/yargs/commit/8d7585c))
* cache pkg lookups by path to avoid returning the wrong one ([#552](https://github.com/yargs/yargs/issues/552)) ([fea7e0b](https://github.com/yargs/yargs/commit/fea7e0b))
* positional arguments were not being handled appropriately by parse() ([#559](https://github.com/yargs/yargs/issues/559)) ([063a866](https://github.com/yargs/yargs/commit/063a866))
* pull in [@nexdrew](https://github.com/nexdrew)'s fixes to yargs-parser ([#560](https://github.com/yargs/yargs/issues/560)) ([c77c080](https://github.com/yargs/yargs/commit/c77c080)), closes [#560](https://github.com/yargs/yargs/issues/560)



<a name="4.8.0"></a>
# [4.8.0](https://github.com/yargs/yargs/compare/v4.7.1...v4.8.0) (2016-07-09)
