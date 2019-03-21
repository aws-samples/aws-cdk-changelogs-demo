<a name="1.11.1"></a>
## <small>1.11.1 (2018-06-14)</small>

* Add JSON schema for .tsqllintrc files (#190) ([69cbb96](https://github.com/tsqllint/tsqllint/commit/69cbb96)), closes [#190](https://github.com/tsqllint/tsqllint/issues/190)
* Add package lock file (#192) ([cab06a6](https://github.com/tsqllint/tsqllint/commit/cab06a6)), closes [#192](https://github.com/tsqllint/tsqllint/issues/192)
* Add release and changelog tooling to dev dependencies ([2bfb203](https://github.com/tsqllint/tsqllint/commit/2bfb203))
* Implement streaming error reports (#191) ([f55d29c](https://github.com/tsqllint/tsqllint/commit/f55d29c)), closes [#191](https://github.com/tsqllint/tsqllint/issues/191)
* Integrate Dynamic Sql Parsing (#188) ([8e7058b](https://github.com/tsqllint/tsqllint/commit/8e7058b)), closes [#188](https://github.com/tsqllint/tsqllint/issues/188)
* Move dotnet source files to their own directory ([e9a071a](https://github.com/tsqllint/tsqllint/commit/e9a071a))
* Update appveyor to use new dotnet source location ([d4edaaa](https://github.com/tsqllint/tsqllint/commit/d4edaaa))
* Update build scripts to target dotnet core 2.1 ([9cd5ab5](https://github.com/tsqllint/tsqllint/commit/9cd5ab5))
* Update contribution guidelines ([3c0fbdd](https://github.com/tsqllint/tsqllint/commit/3c0fbdd))
* Update coverage script to redirect artifact cleanup output to null ([14b2708](https://github.com/tsqllint/tsqllint/commit/14b2708))
* Update dependencies ([c7551a5](https://github.com/tsqllint/tsqllint/commit/c7551a5))
* Update projects to dotnet core 2.1 ([98ace84](https://github.com/tsqllint/tsqllint/commit/98ace84))
* Update Rules Test Helper to Order by Line then by Column (#193) ([4fb5584](https://github.com/tsqllint/tsqllint/commit/4fb5584)), closes [#193](https://github.com/tsqllint/tsqllint/issues/193)
* Update version script to use new source location ([fa3cb2a](https://github.com/tsqllint/tsqllint/commit/fa3cb2a))



<a name="1.11.0"></a>
## 1.11.0 (2018-05-14)

* Add inline compatibility level overrides (#187) ([fad6e05](https://github.com/tsqllint/tsqllint/commit/fad6e05)), closes [#187](https://github.com/tsqllint/tsqllint/issues/187)
* Add support for ignored rules within multi-line comment blocks (#170) ([b60e9bf](https://github.com/tsqllint/tsqllint/commit/b60e9bf)), closes [#170](https://github.com/tsqllint/tsqllint/issues/170)
* Improvements to testing (#171) ([a9bc0b3](https://github.com/tsqllint/tsqllint/commit/a9bc0b3)), closes [#171](https://github.com/tsqllint/tsqllint/issues/171)
* Print plugin version during load (#175) ([bca2aac](https://github.com/tsqllint/tsqllint/commit/bca2aac)), closes [#175](https://github.com/tsqllint/tsqllint/issues/175)
* Refactor test directory structure (#169) ([2717b8a](https://github.com/tsqllint/tsqllint/commit/2717b8a)), closes [#169](https://github.com/tsqllint/tsqllint/issues/169)
* Remove acceptance testing repo ([4d55ee2](https://github.com/tsqllint/tsqllint/commit/4d55ee2))
* Remove external dependencies from TSQLLint.Core (#182) ([030cdd8](https://github.com/tsqllint/tsqllint/commit/030cdd8)), closes [#182](https://github.com/tsqllint/tsqllint/issues/182) [#174](https://github.com/tsqllint/tsqllint/issues/174) [#136](https://github.com/tsqllint/tsqllint/issues/136)
* Update .tsqllintrc example in README ([be437b9](https://github.com/tsqllint/tsqllint/commit/be437b9))
* Update changelog ([0bda1f9](https://github.com/tsqllint/tsqllint/commit/0bda1f9))
* Update non-sargable rule to ignore functions in join queries with multiple predicates (#185) ([3cef1e4](https://github.com/tsqllint/tsqllint/commit/3cef1e4)), closes [#185](https://github.com/tsqllint/tsqllint/issues/185)
* Update README.md ([0948cfe](https://github.com/tsqllint/tsqllint/commit/0948cfe))
* Update release-it tag pattern ([9c51ea6](https://github.com/tsqllint/tsqllint/commit/9c51ea6))
* Update test project to always copy test files to build dir (#183) ([d8d23df](https://github.com/tsqllint/tsqllint/commit/d8d23df)), closes [#183](https://github.com/tsqllint/tsqllint/issues/183)
* Update to allow Compatability-Level 140 (#173) ([260568a](https://github.com/tsqllint/tsqllint/commit/260568a)), closes [#173](https://github.com/tsqllint/tsqllint/issues/173)
* Update version and release tooling (#186) ([37c1d08](https://github.com/tsqllint/tsqllint/commit/37c1d08)), closes [#186](https://github.com/tsqllint/tsqllint/issues/186)



<a name="1.10.1"></a>
## <small>1.10.1 (2018-04-14)</small>

* Release v1.10.1 ([9f0e242](https://github.com/tsqllint/tsqllint/commit/9f0e242))
* Rename compatability_level for consistency (#167) ([a1e657d](https://github.com/tsqllint/tsqllint/commit/a1e657d)), closes [#167](https://github.com/tsqllint/tsqllint/issues/167)
* Update Documentation & Versioning Script (#168) ([31d206b](https://github.com/tsqllint/tsqllint/commit/31d206b)), closes [#168](https://github.com/tsqllint/tsqllint/issues/168)



<a name="1.10.0"></a>
## 1.10.0 (2018-04-12)

*  Add documentation for data-type-length rule (#163) ([8ca0bf1](https://github.com/tsqllint/tsqllint/commit/8ca0bf1)), closes [#163](https://github.com/tsqllint/tsqllint/issues/163)
* Add Configurable SQL Compatibility Level (#166) ([ec2a0ef](https://github.com/tsqllint/tsqllint/commit/ec2a0ef)), closes [#166](https://github.com/tsqllint/tsqllint/issues/166)
* Add documentation for condition-begin-end rule (#159) ([26cc1ad](https://github.com/tsqllint/tsqllint/commit/26cc1ad)), closes [#159](https://github.com/tsqllint/tsqllint/issues/159)
* Add documentation for cross-database-transaction rule (#160) ([55fa61d](https://github.com/tsqllint/tsqllint/commit/55fa61d)), closes [#160](https://github.com/tsqllint/tsqllint/issues/160)
* Add documentation for data-compression rule (#161) ([5056b72](https://github.com/tsqllint/tsqllint/commit/5056b72)), closes [#161](https://github.com/tsqllint/tsqllint/issues/161)
* Add documentation for disallow-cursors rule (#164) ([c10dc15](https://github.com/tsqllint/tsqllint/commit/c10dc15)), closes [#164](https://github.com/tsqllint/tsqllint/issues/164)
* Add documentation for full-text rule ([8035d8e](https://github.com/tsqllint/tsqllint/commit/8035d8e))
* Add documentation for information-schema rule ([27e6864](https://github.com/tsqllint/tsqllint/commit/27e6864))
* Add documentation for keyword-capitalization rule ([410880b](https://github.com/tsqllint/tsqllint/commit/410880b))
* Add documentation for linked-server rule ([2a9901c](https://github.com/tsqllint/tsqllint/commit/2a9901c))
* Add rule for named constraints in temp table (#155) ([13fa236](https://github.com/tsqllint/tsqllint/commit/13fa236)), closes [#155](https://github.com/tsqllint/tsqllint/issues/155)
* Fix data compression rule documentation (#162) ([872535d](https://github.com/tsqllint/tsqllint/commit/872535d)), closes [#162](https://github.com/tsqllint/tsqllint/issues/162)
* Fix spelling and gramatical errors in rules documentation ([d84dfc8](https://github.com/tsqllint/tsqllint/commit/d84dfc8))
* Release v1.10.0 ([1d52f0d](https://github.com/tsqllint/tsqllint/commit/1d52f0d))



<a name="1.9.4"></a>
## <small>1.9.4 (2018-02-14)</small>

* Release v1.9.4 ([a19ede7](https://github.com/tsqllint/tsqllint/commit/a19ede7))
* Update to not set error code when file does not parse (#157) ([7007432](https://github.com/tsqllint/tsqllint/commit/7007432)), closes [#157](https://github.com/tsqllint/tsqllint/issues/157)



<a name="1.9.3"></a>
## <small>1.9.3 (2018-02-09)</small>

* Release v1.9.3 ([49cf200](https://github.com/tsqllint/tsqllint/commit/49cf200))
* Update Fragment builder and Configs (#153) ([6f45e34](https://github.com/tsqllint/tsqllint/commit/6f45e34)), closes [#153](https://github.com/tsqllint/tsqllint/issues/153)



<a name="1.9.2"></a>
## <small>1.9.2 (2018-02-08)</small>

* Release v1.9.2 ([060a2d7](https://github.com/tsqllint/tsqllint/commit/060a2d7))
* Sort Rule Violation Output ([b2a3e6c](https://github.com/tsqllint/tsqllint/commit/b2a3e6c))
* Update Parse Error Handling To Support Global Rule Ignores (#151) ([4a567c5](https://github.com/tsqllint/tsqllint/commit/4a567c5)), closes [#151](https://github.com/tsqllint/tsqllint/issues/151)



<a name="1.9.1"></a>
## <small>1.9.1 (2018-02-04)</small>

* Add check for null sqlFragment in parser (#149) ([d64a369](https://github.com/tsqllint/tsqllint/commit/d64a369)), closes [#149](https://github.com/tsqllint/tsqllint/issues/149)
* Release v1.9.1 ([24bb510](https://github.com/tsqllint/tsqllint/commit/24bb510))
* Update changelog ([e636892](https://github.com/tsqllint/tsqllint/commit/e636892))



<a name="1.9.0"></a>
## 1.9.0 (2018-02-03)

* Add acceptance tests ([f4176da](https://github.com/tsqllint/tsqllint/commit/f4176da))
* Add Change Log (#141) ([33297df](https://github.com/tsqllint/tsqllint/commit/33297df)), closes [#141](https://github.com/tsqllint/tsqllint/issues/141)
* Add documentation for VS Code Extension ([d924020](https://github.com/tsqllint/tsqllint/commit/d924020))
* Allow files with syntax errors to be linted (#129) ([caf1417](https://github.com/tsqllint/tsqllint/commit/caf1417)), closes [#129](https://github.com/tsqllint/tsqllint/issues/129)
* Document new config file discover features in readme (#148) ([7a0d1d3](https://github.com/tsqllint/tsqllint/commit/7a0d1d3)), closes [#148](https://github.com/tsqllint/tsqllint/issues/148)
* Get config from local directory (#138) ([fdb54c4](https://github.com/tsqllint/tsqllint/commit/fdb54c4)), closes [#138](https://github.com/tsqllint/tsqllint/issues/138)
* Pass rule exceptions to plugins (#145) ([eff2ce6](https://github.com/tsqllint/tsqllint/commit/eff2ce6)), closes [#145](https://github.com/tsqllint/tsqllint/issues/145)
* Read config file path from environment variable (#144) ([cd1d757](https://github.com/tsqllint/tsqllint/commit/cd1d757)), closes [#144](https://github.com/tsqllint/tsqllint/issues/144)
* Release v1.9.0 ([070eed4](https://github.com/tsqllint/tsqllint/commit/070eed4))
* Remove requirement for ELSE statements to be terminated with semicolons (#134) ([c8d5c4f](https://github.com/tsqllint/tsqllint/commit/c8d5c4f)), closes [#134](https://github.com/tsqllint/tsqllint/issues/134)
* Set global rule exception name to GLOBAL (#146) ([a3b2f6c](https://github.com/tsqllint/tsqllint/commit/a3b2f6c)), closes [#146](https://github.com/tsqllint/tsqllint/issues/146)
* throw semicolon error when missing from end catch (#132) ([413fb45](https://github.com/tsqllint/tsqllint/commit/413fb45)), closes [#132](https://github.com/tsqllint/tsqllint/issues/132)



<a name="1.8.10"></a>
## <small>1.8.10 (2018-01-12)</small>

* Release v1.8.10 ([4b21dee](https://github.com/tsqllint/tsqllint/commit/4b21dee))
* Update tsqllint.js to emit exit code from wrapped dotnet call (#126) ([c8484b6](https://github.com/tsqllint/tsqllint/commit/c8484b6)), closes [#126](https://github.com/tsqllint/tsqllint/issues/126)



<a name="1.8.9"></a>
## <small>1.8.9 (2018-01-11)</small>

* Create tests for inline rule disablements that contain additional metadata (#123) ([b3b112a](https://github.com/tsqllint/tsqllint/commit/b3b112a)), closes [#123](https://github.com/tsqllint/tsqllint/issues/123)
* Release v1.8.9 ([ea3127b](https://github.com/tsqllint/tsqllint/commit/ea3127b))
* Update to return 1 when passed invalid SQL (#125) ([4af706c](https://github.com/tsqllint/tsqllint/commit/4af706c)), closes [#125](https://github.com/tsqllint/tsqllint/issues/125)



<a name="1.8.8"></a>
## <small>1.8.8 (2018-01-09)</small>

* another reference to x32 (#122) ([1166e51](https://github.com/tsqllint/tsqllint/commit/1166e51)), closes [#122](https://github.com/tsqllint/tsqllint/issues/122)
* Release v1.8.8 ([72de319](https://github.com/tsqllint/tsqllint/commit/72de319))



<a name="1.8.7"></a>
## <small>1.8.7 (2018-01-09)</small>

* Modify JS to use syntax for Node.js 4+ (#120) ([02111af](https://github.com/tsqllint/tsqllint/commit/02111af)), closes [#120](https://github.com/tsqllint/tsqllint/issues/120)
* Release v1.8.7 ([a790a93](https://github.com/tsqllint/tsqllint/commit/a790a93))
* Update install.js (#121) ([d5be486](https://github.com/tsqllint/tsqllint/commit/d5be486)), closes [#121](https://github.com/tsqllint/tsqllint/issues/121)



<a name="1.8.6"></a>
## <small>1.8.6 (2017-12-30)</small>

* Release v1.8.6 ([c3b2d48](https://github.com/tsqllint/tsqllint/commit/c3b2d48))
* Update appveyor publish command ([8b38952](https://github.com/tsqllint/tsqllint/commit/8b38952))



<a name="1.8.5"></a>
## <small>1.8.5 (2017-12-30)</small>

* Add standard and update js to comply (#115) ([759cb9f](https://github.com/tsqllint/tsqllint/commit/759cb9f)), closes [#115](https://github.com/tsqllint/tsqllint/issues/115)
* Add versioning script (#107) ([acdffff](https://github.com/tsqllint/tsqllint/commit/acdffff)), closes [#107](https://github.com/tsqllint/tsqllint/issues/107)
* Change downloaded zipped tar file to tgz ([e15282b](https://github.com/tsqllint/tsqllint/commit/e15282b))
* Fix Semicolon Termination Waitfor Bug (#118) ([caa9d81](https://github.com/tsqllint/tsqllint/commit/caa9d81)), closes [#118](https://github.com/tsqllint/tsqllint/issues/118)
* Implement Stylecop Analyzer (#113) ([26b0358](https://github.com/tsqllint/tsqllint/commit/26b0358)), closes [#113](https://github.com/tsqllint/tsqllint/issues/113)
* Release v1.8.5 ([700e8e8](https://github.com/tsqllint/tsqllint/commit/700e8e8))
* Remove .net framework from build targets (#109) ([35d7597](https://github.com/tsqllint/tsqllint/commit/35d7597)), closes [#109](https://github.com/tsqllint/tsqllint/issues/109)
* Remove path from dotnet argument in cover script ([f3e0fb0](https://github.com/tsqllint/tsqllint/commit/f3e0fb0))
* Remove unused templates, configs, and files (#110) ([ce45ffb](https://github.com/tsqllint/tsqllint/commit/ce45ffb)), closes [#110](https://github.com/tsqllint/tsqllint/issues/110)
* Tooling Updates (#108) ([b2fcd4e](https://github.com/tsqllint/tsqllint/commit/b2fcd4e)), closes [#108](https://github.com/tsqllint/tsqllint/issues/108)
* Update appveyor to publish tags only (#114) ([2fdc6a4](https://github.com/tsqllint/tsqllint/commit/2fdc6a4)), closes [#114](https://github.com/tsqllint/tsqllint/issues/114)
* Update dependecies & Reduce Complexity (#112) ([8b3237f](https://github.com/tsqllint/tsqllint/commit/8b3237f)), closes [#112](https://github.com/tsqllint/tsqllint/issues/112)
* Update dependencies and reduce complexity (#111) ([d00093f](https://github.com/tsqllint/tsqllint/commit/d00093f)), closes [#111](https://github.com/tsqllint/tsqllint/issues/111)
* Update tsqllint.js to use self contained binary ([f769a36](https://github.com/tsqllint/tsqllint/commit/f769a36))



<a name="1.8.4"></a>
## <small>1.8.4 (2017-12-12)</small>

* Add exclusion for Goto & Label Statements to SemicolonTermination Rule (#98) ([0031ea6](https://github.com/tsqllint/tsqllint/commit/0031ea6)), closes [#98](https://github.com/tsqllint/tsqllint/issues/98)
* Add functional test for plugins (#96) ([25e4dab](https://github.com/tsqllint/tsqllint/commit/25e4dab)), closes [#96](https://github.com/tsqllint/tsqllint/issues/96)
* Add unicode-string rule ([3eed3f8](https://github.com/tsqllint/tsqllint/commit/3eed3f8))
* Push artifacts to Github on Tag ([2c15c23](https://github.com/tsqllint/tsqllint/commit/2c15c23))
* Push artifacts to Github on Tag ([256c737](https://github.com/tsqllint/tsqllint/commit/256c737))
* Release v1.8.3 ([e1a481b](https://github.com/tsqllint/tsqllint/commit/e1a481b))
* Release v1.8.4 ([6b8341d](https://github.com/tsqllint/tsqllint/commit/6b8341d))
* Remove unused scripts (#103) ([d17a485](https://github.com/tsqllint/tsqllint/commit/d17a485)), closes [#103](https://github.com/tsqllint/tsqllint/issues/103)
* Update build configuration ([fc7d042](https://github.com/tsqllint/tsqllint/commit/fc7d042))
* Update Code Coverage Checks and Reporting (#99) ([f6fca2b](https://github.com/tsqllint/tsqllint/commit/f6fca2b)), closes [#99](https://github.com/tsqllint/tsqllint/issues/99)
* Update dependencies (#94) ([3aabc7a](https://github.com/tsqllint/tsqllint/commit/3aabc7a)), closes [#94](https://github.com/tsqllint/tsqllint/issues/94)
* Update install script to rely upon self contained deployment (#104) ([ed84c32](https://github.com/tsqllint/tsqllint/commit/ed84c32)), closes [#104](https://github.com/tsqllint/tsqllint/issues/104)
* Upgrade to net47 (#101) ([27a31b7](https://github.com/tsqllint/tsqllint/commit/27a31b7)), closes [#101](https://github.com/tsqllint/tsqllint/issues/101)



<a name="1.8.2"></a>
## <small>1.8.2 (2017-11-30)</small>

* Release v1.8.1 ([93ae19c](https://github.com/tsqllint/tsqllint/commit/93ae19c))
* Release v1.8.2 ([2747988](https://github.com/tsqllint/tsqllint/commit/2747988))
* Update cross-database-transaction to handle uncommited transactions (#89) ([8d132a3](https://github.com/tsqllint/tsqllint/commit/8d132a3)), closes [#89](https://github.com/tsqllint/tsqllint/issues/89)
* Update upper-lower rule to only flag comparisons in select statements (#91) ([96bd6eb](https://github.com/tsqllint/tsqllint/commit/96bd6eb)), closes [#91](https://github.com/tsqllint/tsqllint/issues/91)



<a name="1.8.0"></a>
## 1.8.0 (2017-11-29)

* Add concat-strings rule ([e08750a](https://github.com/tsqllint/tsqllint/commit/e08750a))
* Add cross-database-transaction rule ([f5af8f0](https://github.com/tsqllint/tsqllint/commit/f5af8f0))
* Release v1.8.0 ([23c0c7f](https://github.com/tsqllint/tsqllint/commit/23c0c7f))



<a name="1.7.0"></a>
## 1.7.0 (2017-11-28)

* Add Full Text Rule (#81) ([2e14485](https://github.com/tsqllint/tsqllint/commit/2e14485)), closes [#81](https://github.com/tsqllint/tsqllint/issues/81)
* Improve rule visitor builder performance (#83) ([bd79dbe](https://github.com/tsqllint/tsqllint/commit/bd79dbe)), closes [#83](https://github.com/tsqllint/tsqllint/issues/83)
* Release v1.7.0 ([8ab72fc](https://github.com/tsqllint/tsqllint/commit/8ab72fc))
* Remove newlines from plugin reporting (#79) ([3ee05bb](https://github.com/tsqllint/tsqllint/commit/3ee05bb)), closes [#79](https://github.com/tsqllint/tsqllint/issues/79)
* Update CommandLineOptionsTests file paths to work cross platform (#80) ([1386888](https://github.com/tsqllint/tsqllint/commit/1386888)), closes [#80](https://github.com/tsqllint/tsqllint/issues/80)
* Update full text rule column source (#82) ([de6848b](https://github.com/tsqllint/tsqllint/commit/de6848b)), closes [#82](https://github.com/tsqllint/tsqllint/issues/82)
* Update non-sargable rule to allow isnull when other filters exist (#85) ([4f80c4e](https://github.com/tsqllint/tsqllint/commit/4f80c4e)), closes [#85](https://github.com/tsqllint/tsqllint/issues/85)



<a name="1.6.1"></a>
## <small>1.6.1 (2017-11-17)</small>

*  Remove un-needed public methods from SQLFileProcessor (#71) ([744743b](https://github.com/tsqllint/tsqllint/commit/744743b)), closes [#71](https://github.com/tsqllint/tsqllint/issues/71)
* Add TravisCi Badge ([89e94a8](https://github.com/tsqllint/tsqllint/commit/89e94a8))
* Ensure plugin does not load twice ([035424d](https://github.com/tsqllint/tsqllint/commit/035424d))
* Improve RuleExceptionFinder Code Coverage (#69) ([8457e4d](https://github.com/tsqllint/tsqllint/commit/8457e4d)), closes [#69](https://github.com/tsqllint/tsqllint/issues/69)
* Port to project to dotnet standard ([aa735a2](https://github.com/tsqllint/tsqllint/commit/aa735a2))
* Refactor Command Line Parameter Parsing (#68) ([93dcf78](https://github.com/tsqllint/tsqllint/commit/93dcf78)), closes [#68](https://github.com/tsqllint/tsqllint/issues/68)
* Refactor to Prepare for Strategy Pattern Implementation (#66) ([0cd6da6](https://github.com/tsqllint/tsqllint/commit/0cd6da6)), closes [#66](https://github.com/tsqllint/tsqllint/issues/66)
* Release v1.6.0 ([ee5e680](https://github.com/tsqllint/tsqllint/commit/ee5e680))
* Release v1.6.1 ([60e99b5](https://github.com/tsqllint/tsqllint/commit/60e99b5))
* Remove unused constructor in SqlFileProcessor (#70) ([cbd2209](https://github.com/tsqllint/tsqllint/commit/cbd2209)), closes [#70](https://github.com/tsqllint/tsqllint/issues/70)
* Swap exec to spawn in tsqllint.js ([631bfe6](https://github.com/tsqllint/tsqllint/commit/631bfe6))
* Update build and install process to support osx (#77) ([66e26b1](https://github.com/tsqllint/tsqllint/commit/66e26b1)), closes [#77](https://github.com/tsqllint/tsqllint/issues/77)
* Update code coverage for dotnet core ([ef31247](https://github.com/tsqllint/tsqllint/commit/ef31247))



<a name="1.5.0"></a>
## 1.5.0 (2017-11-10)

* Add Feature to Allow Rule Disablement ([b9522e4](https://github.com/tsqllint/tsqllint/commit/b9522e4))
* Add feature to list plugins ([cfd71f9](https://github.com/tsqllint/tsqllint/commit/cfd71f9))
* Add Lib and Test assemblies to Costura Exclusion ([0184c6d](https://github.com/tsqllint/tsqllint/commit/0184c6d))
* Add package artifacts to .gitignore (#55) ([573ec07](https://github.com/tsqllint/tsqllint/commit/573ec07)), closes [#55](https://github.com/tsqllint/tsqllint/issues/55)
* Add rule for non-sargable queries ([1965ed4](https://github.com/tsqllint/tsqllint/commit/1965ed4))
* Add support for relative plugin paths (#63) ([abad3d9](https://github.com/tsqllint/tsqllint/commit/abad3d9)), closes [#63](https://github.com/tsqllint/tsqllint/issues/63)
* Add tracing ([5974363](https://github.com/tsqllint/tsqllint/commit/5974363))
* Consolodate tests into substitutes ([8dcdd18](https://github.com/tsqllint/tsqllint/commit/8dcdd18))
* Exclude test utility from coverage ([016afaa](https://github.com/tsqllint/tsqllint/commit/016afaa))
* Fix solution file name casing ([6945d7e](https://github.com/tsqllint/tsqllint/commit/6945d7e))
* Improve code statistics ([8f5a0ea](https://github.com/tsqllint/tsqllint/commit/8f5a0ea))
* Improve column calculation for non-sargable rule ([7bad81c](https://github.com/tsqllint/tsqllint/commit/7bad81c))
* Move RuleVisitor Type List to AutoGenerated Class ([d5d9336](https://github.com/tsqllint/tsqllint/commit/d5d9336))
* Refactor column counter for readability ([733a677](https://github.com/tsqllint/tsqllint/commit/733a677))
* Release v1.5.0 ([87c5009](https://github.com/tsqllint/tsqllint/commit/87c5009))
* Remove local variable in test helper ([c11427d](https://github.com/tsqllint/tsqllint/commit/c11427d))
* Remove single line comment validation from StyleCop ([ff8909a](https://github.com/tsqllint/tsqllint/commit/ff8909a))
* Rename line variables in column position function ([910f754](https://github.com/tsqllint/tsqllint/commit/910f754))
* Report failure to find plugin (#56) ([65ef30f](https://github.com/tsqllint/tsqllint/commit/65ef30f)), closes [#56](https://github.com/tsqllint/tsqllint/issues/56)
* Suppress help text during config file init ([9f72993](https://github.com/tsqllint/tsqllint/commit/9f72993))
* Update AssemblyInfo ([5d1cab0](https://github.com/tsqllint/tsqllint/commit/5d1cab0))
* Update readme ([1398432](https://github.com/tsqllint/tsqllint/commit/1398432))
* Update README.md ([1f79e8c](https://github.com/tsqllint/tsqllint/commit/1f79e8c))



<a name="1.4.1"></a>
## <small>1.4.1 (2017-10-19)</small>

* Release v1.4.1 ([6de9614](https://github.com/tsqllint/tsqllint/commit/6de9614))
* Remove cross database error reporting for linked server queries ([4745c6c](https://github.com/tsqllint/tsqllint/commit/4745c6c))
* Update README, add new rules ([71ca03b](https://github.com/tsqllint/tsqllint/commit/71ca03b))



<a name="1.4.0"></a>
## 1.4.0 (2017-10-14)

* Add cross database rule ([3ea6647](https://github.com/tsqllint/tsqllint/commit/3ea6647))
* Add linked server rule ([7c19fe6](https://github.com/tsqllint/tsqllint/commit/7c19fe6))
* Create template for new rules ([875367c](https://github.com/tsqllint/tsqllint/commit/875367c))
* Improve CommandLineOptionHandler readability ([79a0a78](https://github.com/tsqllint/tsqllint/commit/79a0a78))
* Refactor rules tests into separate files ([ceb1fb0](https://github.com/tsqllint/tsqllint/commit/ceb1fb0))
* Release v1.4.0 ([66648bc](https://github.com/tsqllint/tsqllint/commit/66648bc))
* Remove dead code in rule visitor ([8e3ba9b](https://github.com/tsqllint/tsqllint/commit/8e3ba9b))
* Remove unused directives ([4c218cf](https://github.com/tsqllint/tsqllint/commit/4c218cf))



<a name="1.3.0"></a>
## 1.3.0 (2017-10-11)

* Create CODE_OF_CONDUCT.md ([a4d20b4](https://github.com/tsqllint/tsqllint/commit/a4d20b4))
* Document usage in external tools ([9ad3a74](https://github.com/tsqllint/tsqllint/commit/9ad3a74))
* Release v1.3.0 ([2ba3110](https://github.com/tsqllint/tsqllint/commit/2ba3110))
* Remove BEGIN semicolon termination requirement ([8b948ac](https://github.com/tsqllint/tsqllint/commit/8b948ac))
* Remove violations list from rule visitor ([68f1026](https://github.com/tsqllint/tsqllint/commit/68f1026))
* Update exit status code to return 1 for linting errors ([5091ffa](https://github.com/tsqllint/tsqllint/commit/5091ffa))



<a name="1.2.0"></a>
## 1.2.0 (2017-10-08)

* Add coverage for config reader ([da26ca2](https://github.com/tsqllint/tsqllint/commit/da26ca2))
* Add coverage for integration tests ([12b06de](https://github.com/tsqllint/tsqllint/commit/12b06de))
* Add plugin framework (#48) ([ab46f96](https://github.com/tsqllint/tsqllint/commit/ab46f96)), closes [#48](https://github.com/tsqllint/tsqllint/issues/48)
* Add test for create partioned view ([13a63c2](https://github.com/tsqllint/tsqllint/commit/13a63c2))
* Add tests for in memory config ([f2a227b](https://github.com/tsqllint/tsqllint/commit/f2a227b))
* Automatically create config file (#47) ([0c0c084](https://github.com/tsqllint/tsqllint/commit/0c0c084)), closes [#47](https://github.com/tsqllint/tsqllint/issues/47)
* Clean up dead code ([29a891c](https://github.com/tsqllint/tsqllint/commit/29a891c))
* Document Plugin config and usage ([b28fa68](https://github.com/tsqllint/tsqllint/commit/b28fa68))
* Refactor functional tests ([6ad4e3c](https://github.com/tsqllint/tsqllint/commit/6ad4e3c))
* Release v1.2.0 ([00d8315](https://github.com/tsqllint/tsqllint/commit/00d8315))
* Remove caching from appveyor config ([3fd33c1](https://github.com/tsqllint/tsqllint/commit/3fd33c1))
* Remove Global Nuget ([c3dfa84](https://github.com/tsqllint/tsqllint/commit/c3dfa84))
* Simplify command line and parsing and config handling ([af7ce65](https://github.com/tsqllint/tsqllint/commit/af7ce65))
* Standardize styling (#49) ([189c16a](https://github.com/tsqllint/tsqllint/commit/189c16a)), closes [#49](https://github.com/tsqllint/tsqllint/issues/49)
* Update IntegrationTests ([3380ca9](https://github.com/tsqllint/tsqllint/commit/3380ca9))
* Update project namespaces ([97517f4](https://github.com/tsqllint/tsqllint/commit/97517f4))
* Update reference to TSQLLint.Common ([fd787b9](https://github.com/tsqllint/tsqllint/commit/fd787b9))



<a name="1.1.5"></a>
## <small>1.1.5 (2017-09-18)</small>

* Add set variable rule (#40) ([c8554d1](https://github.com/tsqllint/tsqllint/commit/c8554d1)), closes [#40](https://github.com/tsqllint/tsqllint/issues/40)
* Fix directory doesnt exist bug (#39) ([587765b](https://github.com/tsqllint/tsqllint/commit/587765b)), closes [#39](https://github.com/tsqllint/tsqllint/issues/39)
* Fix special character bug in keyword-capitalization rule ([f50a749](https://github.com/tsqllint/tsqllint/commit/f50a749))
* Release v1.1.5 ([8257f47](https://github.com/tsqllint/tsqllint/commit/8257f47))
* Update semicolon rule to correctly parse subqueries in create statements ([a5c82b7](https://github.com/tsqllint/tsqllint/commit/a5c82b7))



<a name="1.1.4"></a>
## <small>1.1.4 (2017-08-30)</small>

* Add more instructions to installation (#34) ([3d37684](https://github.com/tsqllint/tsqllint/commit/3d37684)), closes [#34](https://github.com/tsqllint/tsqllint/issues/34)
* Fix exit code for help option (#30) ([07e5944](https://github.com/tsqllint/tsqllint/commit/07e5944)), closes [#30](https://github.com/tsqllint/tsqllint/issues/30)
* Fix references to APPDATA (#36) ([7cee690](https://github.com/tsqllint/tsqllint/commit/7cee690)), closes [#36](https://github.com/tsqllint/tsqllint/issues/36)
* Release v1.1.4 ([c638d49](https://github.com/tsqllint/tsqllint/commit/c638d49))
* Specify node engine in package.json (#35) ([16dfff2](https://github.com/tsqllint/tsqllint/commit/16dfff2)), closes [#35](https://github.com/tsqllint/tsqllint/issues/35)



<a name="1.1.3"></a>
## <small>1.1.3 (2017-08-24)</small>

* Add download badge ([d0b3d7b](https://github.com/tsqllint/tsqllint/commit/d0b3d7b))
* Build package in CI (#20) ([cb984ec](https://github.com/tsqllint/tsqllint/commit/cb984ec)), closes [#20](https://github.com/tsqllint/tsqllint/issues/20)
* Cache the final NuGet package installed files (#13) ([f555f8a](https://github.com/tsqllint/tsqllint/commit/f555f8a)), closes [#13](https://github.com/tsqllint/tsqllint/issues/13)
* Fix assembly versioning script ([218bb20](https://github.com/tsqllint/tsqllint/commit/218bb20))
* Fix syntax error to show "error" instead of "off" (#11) ([217cb42](https://github.com/tsqllint/tsqllint/commit/217cb42)), closes [#11](https://github.com/tsqllint/tsqllint/issues/11)
* Fix Windows Git Bash Install (#17) ([d47d0e8](https://github.com/tsqllint/tsqllint/commit/d47d0e8)), closes [#17](https://github.com/tsqllint/tsqllint/issues/17)
* Improve error reporting (#15) ([9cc4c58](https://github.com/tsqllint/tsqllint/commit/9cc4c58)), closes [#15](https://github.com/tsqllint/tsqllint/issues/15)
* Install ScriptDom dependency when it doesnt exist on host machine (#22) ([175b25c](https://github.com/tsqllint/tsqllint/commit/175b25c)), closes [#22](https://github.com/tsqllint/tsqllint/issues/22)
* Release v1.1.2 ([70848f9](https://github.com/tsqllint/tsqllint/commit/70848f9))
* Release v1.1.3 ([517cd6b](https://github.com/tsqllint/tsqllint/commit/517cd6b))
* Remove the NuGet IP from AppVeyor (#12) ([f8803ac](https://github.com/tsqllint/tsqllint/commit/f8803ac)), closes [#12](https://github.com/tsqllint/tsqllint/issues/12)
* Use npm config prefix for postinstall script (#28) ([c5fa835](https://github.com/tsqllint/tsqllint/commit/c5fa835)), closes [#28](https://github.com/tsqllint/tsqllint/issues/28)
* Use repository short-hand in package.json (#14) ([c813eed](https://github.com/tsqllint/tsqllint/commit/c813eed)), closes [#14](https://github.com/tsqllint/tsqllint/issues/14)
* Wildcards (#26) ([b0f9ed9](https://github.com/tsqllint/tsqllint/commit/b0f9ed9)), closes [#26](https://github.com/tsqllint/tsqllint/issues/26)



<a name="1.1.1"></a>
## <small>1.1.1 (2017-08-04)</small>

* Add default rules ([3d0d5bb](https://github.com/tsqllint/tsqllint/commit/3d0d5bb))
* Add directory walking to sqlparser ([1844db2](https://github.com/tsqllint/tsqllint/commit/1844db2))
* Add file list processing ([6fb35e1](https://github.com/tsqllint/tsqllint/commit/6fb35e1))
* Add guardrail to prevent config file clobbering ([dfd9049](https://github.com/tsqllint/tsqllint/commit/dfd9049))
* Change error response for missing lint path ([e684da8](https://github.com/tsqllint/tsqllint/commit/e684da8))
* Create linting and confing handler ([1d1708c](https://github.com/tsqllint/tsqllint/commit/1d1708c))
* Fix bug with MultiTableAliasRule and CTE ([a0b86b5](https://github.com/tsqllint/tsqllint/commit/a0b86b5))
* Improve command line interactions ([2f6120c](https://github.com/tsqllint/tsqllint/commit/2f6120c))
* Improve commandline option handling ([d3ec93b](https://github.com/tsqllint/tsqllint/commit/d3ec93b))
* Init ([aa8cc30](https://github.com/tsqllint/tsqllint/commit/aa8cc30))
* Release 0.1.30 ([9b158c4](https://github.com/tsqllint/tsqllint/commit/9b158c4))
* Release v1.0.0 ([6d14826](https://github.com/tsqllint/tsqllint/commit/6d14826))
* Release v1.0.1 ([9d36e5e](https://github.com/tsqllint/tsqllint/commit/9d36e5e))
* Release v1.0.2 ([e3f7a74](https://github.com/tsqllint/tsqllint/commit/e3f7a74))
* Release v1.1.0 ([ca614f3](https://github.com/tsqllint/tsqllint/commit/ca614f3))
* Release v1.1.1 ([9bd7eb4](https://github.com/tsqllint/tsqllint/commit/9bd7eb4))
* Standardize rule text ([197a3b8](https://github.com/tsqllint/tsqllint/commit/197a3b8))



=======
<a name="Unreleased"></a>
## Unreleased (2018-05-13)

* Add support for ignored rules within multi-line comment blocks (#170) ([b60e9bf](https://github.com/tsqllint/tsqllint/commit/b60e9bf)), closes [#170](https://github.com/tsqllint/tsqllint/issues/170)
* Improvements to testing (#171) ([a9bc0b3](https://github.com/tsqllint/tsqllint/commit/a9bc0b3)), closes [#171](https://github.com/tsqllint/tsqllint/issues/171)
* Print plugin version during load (#175) ([bca2aac](https://github.com/tsqllint/tsqllint/commit/bca2aac)), closes [#175](https://github.com/tsqllint/tsqllint/issues/175)
* Refactor test directory structure (#169) ([2717b8a](https://github.com/tsqllint/tsqllint/commit/2717b8a)), closes [#169](https://github.com/tsqllint/tsqllint/issues/169)
* Remove acceptance testing repo ([4d55ee2](https://github.com/tsqllint/tsqllint/commit/4d55ee2))
* Remove external dependencies from TSQLLint.Core (#182) ([030cdd8](https://github.com/tsqllint/tsqllint/commit/030cdd8)), closes [#182](https://github.com/tsqllint/tsqllint/issues/182) [#174](https://github.com/tsqllint/tsqllint/issues/174) [#136](https://github.com/tsqllint/tsqllint/issues/136)
* Update .tsqllintrc example in README ([be437b9](https://github.com/tsqllint/tsqllint/commit/be437b9))
* Update changelog ([0bda1f9](https://github.com/tsqllint/tsqllint/commit/0bda1f9))
* Update non-sargable rule to ignore functions in join queries with multiple predicates (#185) ([3cef1e4](https://github.com/tsqllint/tsqllint/commit/3cef1e4)), closes [#185](https://github.com/tsqllint/tsqllint/issues/185)
* Update README.md ([0948cfe](https://github.com/tsqllint/tsqllint/commit/0948cfe))
* Update test project to always copy test files to build dir (#183) ([d8d23df](https://github.com/tsqllint/tsqllint/commit/d8d23df)), closes [#183](https://github.com/tsqllint/tsqllint/issues/183)
* Update to allow Compatability-Level 140 (#173) ([260568a](https://github.com/tsqllint/tsqllint/commit/260568a)), closes [#173](https://github.com/tsqllint/tsqllint/issues/173)



=======
>>>>>>> Update version script to include new project files
<a name="1.10.1"></a>
## <small>1.10.1 (2018-04-14)</small>

* Release v1.10.1 ([9f0e242](https://github.com/tsqllint/tsqllint/commit/9f0e242))
* Rename compatability_level for consistency (#167) ([a1e657d](https://github.com/tsqllint/tsqllint/commit/a1e657d)), closes [#167](https://github.com/tsqllint/tsqllint/issues/167)
* Update Documentation & Versioning Script (#168) ([31d206b](https://github.com/tsqllint/tsqllint/commit/31d206b)), closes [#168](https://github.com/tsqllint/tsqllint/issues/168)



<a name="1.10.0"></a>
## 1.10.0 (2018-04-12)

*  Add documentation for data-type-length rule (#163) ([8ca0bf1](https://github.com/tsqllint/tsqllint/commit/8ca0bf1)), closes [#163](https://github.com/tsqllint/tsqllint/issues/163)
* Add Configurable SQL Compatibility Level (#166) ([ec2a0ef](https://github.com/tsqllint/tsqllint/commit/ec2a0ef)), closes [#166](https://github.com/tsqllint/tsqllint/issues/166)
* Add documentation for condition-begin-end rule (#159) ([26cc1ad](https://github.com/tsqllint/tsqllint/commit/26cc1ad)), closes [#159](https://github.com/tsqllint/tsqllint/issues/159)
* Add documentation for cross-database-transaction rule (#160) ([55fa61d](https://github.com/tsqllint/tsqllint/commit/55fa61d)), closes [#160](https://github.com/tsqllint/tsqllint/issues/160)
* Add documentation for data-compression rule (#161) ([5056b72](https://github.com/tsqllint/tsqllint/commit/5056b72)), closes [#161](https://github.com/tsqllint/tsqllint/issues/161)
* Add documentation for disallow-cursors rule (#164) ([c10dc15](https://github.com/tsqllint/tsqllint/commit/c10dc15)), closes [#164](https://github.com/tsqllint/tsqllint/issues/164)
* Add documentation for full-text rule ([8035d8e](https://github.com/tsqllint/tsqllint/commit/8035d8e))
* Add documentation for information-schema rule ([27e6864](https://github.com/tsqllint/tsqllint/commit/27e6864))
* Add documentation for keyword-capitalization rule ([410880b](https://github.com/tsqllint/tsqllint/commit/410880b))
* Add documentation for linked-server rule ([2a9901c](https://github.com/tsqllint/tsqllint/commit/2a9901c))
* Add rule for named constraints in temp table (#155) ([13fa236](https://github.com/tsqllint/tsqllint/commit/13fa236)), closes [#155](https://github.com/tsqllint/tsqllint/issues/155)
* Fix data compression rule documentation (#162) ([872535d](https://github.com/tsqllint/tsqllint/commit/872535d)), closes [#162](https://github.com/tsqllint/tsqllint/issues/162)
* Fix spelling and gramatical errors in rules documentation ([d84dfc8](https://github.com/tsqllint/tsqllint/commit/d84dfc8))
* Release v1.10.0 ([1d52f0d](https://github.com/tsqllint/tsqllint/commit/1d52f0d))



<a name="1.9.4"></a>
## <small>1.9.4 (2018-02-14)</small>

* Release v1.9.4 ([a19ede7](https://github.com/tsqllint/tsqllint/commit/a19ede7))
* Update to not set error code when file does not parse (#157) ([7007432](https://github.com/tsqllint/tsqllint/commit/7007432)), closes [#157](https://github.com/tsqllint/tsqllint/issues/157)



<a name="1.9.3"></a>
## <small>1.9.3 (2018-02-09)</small>

* Release v1.9.3 ([49cf200](https://github.com/tsqllint/tsqllint/commit/49cf200))
* Update Fragment builder and Configs (#153) ([6f45e34](https://github.com/tsqllint/tsqllint/commit/6f45e34)), closes [#153](https://github.com/tsqllint/tsqllint/issues/153)



<a name="1.9.2"></a>
## <small>1.9.2 (2018-02-08)</small>

* Release v1.9.2 ([060a2d7](https://github.com/tsqllint/tsqllint/commit/060a2d7))
* Sort Rule Violation Output ([b2a3e6c](https://github.com/tsqllint/tsqllint/commit/b2a3e6c))
* Update Parse Error Handling To Support Global Rule Ignores (#151) ([4a567c5](https://github.com/tsqllint/tsqllint/commit/4a567c5)), closes [#151](https://github.com/tsqllint/tsqllint/issues/151)



<a name="1.9.1"></a>
## <small>1.9.1 (2018-02-04)</small>

* Add check for null sqlFragment in parser (#149) ([d64a369](https://github.com/tsqllint/tsqllint/commit/d64a369)), closes [#149](https://github.com/tsqllint/tsqllint/issues/149)
* Release v1.9.1 ([24bb510](https://github.com/tsqllint/tsqllint/commit/24bb510))
* Update changelog ([e636892](https://github.com/tsqllint/tsqllint/commit/e636892))



<a name="1.9.0"></a>
## 1.9.0 (2018-02-03)

* Add acceptance tests ([f4176da](https://github.com/tsqllint/tsqllint/commit/f4176da))
* Add Change Log (#141) ([33297df](https://github.com/tsqllint/tsqllint/commit/33297df)), closes [#141](https://github.com/tsqllint/tsqllint/issues/141)
* Add documentation for VS Code Extension ([d924020](https://github.com/tsqllint/tsqllint/commit/d924020))
* Allow files with syntax errors to be linted (#129) ([caf1417](https://github.com/tsqllint/tsqllint/commit/caf1417)), closes [#129](https://github.com/tsqllint/tsqllint/issues/129)
* Document new config file discover features in readme (#148) ([7a0d1d3](https://github.com/tsqllint/tsqllint/commit/7a0d1d3)), closes [#148](https://github.com/tsqllint/tsqllint/issues/148)
* Get config from local directory (#138) ([fdb54c4](https://github.com/tsqllint/tsqllint/commit/fdb54c4)), closes [#138](https://github.com/tsqllint/tsqllint/issues/138)
* Pass rule exceptions to plugins (#145) ([eff2ce6](https://github.com/tsqllint/tsqllint/commit/eff2ce6)), closes [#145](https://github.com/tsqllint/tsqllint/issues/145)
* Read config file path from environment variable (#144) ([cd1d757](https://github.com/tsqllint/tsqllint/commit/cd1d757)), closes [#144](https://github.com/tsqllint/tsqllint/issues/144)
* Release v1.9.0 ([070eed4](https://github.com/tsqllint/tsqllint/commit/070eed4))
* Remove requirement for ELSE statements to be terminated with semicolons (#134) ([c8d5c4f](https://github.com/tsqllint/tsqllint/commit/c8d5c4f)), closes [#134](https://github.com/tsqllint/tsqllint/issues/134)
* Set global rule exception name to GLOBAL (#146) ([a3b2f6c](https://github.com/tsqllint/tsqllint/commit/a3b2f6c)), closes [#146](https://github.com/tsqllint/tsqllint/issues/146)
* throw semicolon error when missing from end catch (#132) ([413fb45](https://github.com/tsqllint/tsqllint/commit/413fb45)), closes [#132](https://github.com/tsqllint/tsqllint/issues/132)



<a name="1.8.10"></a>
## <small>1.8.10 (2018-01-12)</small>

* Release v1.8.10 ([4b21dee](https://github.com/tsqllint/tsqllint/commit/4b21dee))
* Update tsqllint.js to emit exit code from wrapped dotnet call (#126) ([c8484b6](https://github.com/tsqllint/tsqllint/commit/c8484b6)), closes [#126](https://github.com/tsqllint/tsqllint/issues/126)



<a name="1.8.9"></a>
## <small>1.8.9 (2018-01-11)</small>

* Create tests for inline rule disablements that contain additional metadata (#123) ([b3b112a](https://github.com/tsqllint/tsqllint/commit/b3b112a)), closes [#123](https://github.com/tsqllint/tsqllint/issues/123)
* Release v1.8.9 ([ea3127b](https://github.com/tsqllint/tsqllint/commit/ea3127b))
* Update to return 1 when passed invalid SQL (#125) ([4af706c](https://github.com/tsqllint/tsqllint/commit/4af706c)), closes [#125](https://github.com/tsqllint/tsqllint/issues/125)



<a name="1.8.8"></a>
## <small>1.8.8 (2018-01-09)</small>

* another reference to x32 (#122) ([1166e51](https://github.com/tsqllint/tsqllint/commit/1166e51)), closes [#122](https://github.com/tsqllint/tsqllint/issues/122)
* Release v1.8.8 ([72de319](https://github.com/tsqllint/tsqllint/commit/72de319))



<a name="1.8.7"></a>
## <small>1.8.7 (2018-01-09)</small>

* Modify JS to use syntax for Node.js 4+ (#120) ([02111af](https://github.com/tsqllint/tsqllint/commit/02111af)), closes [#120](https://github.com/tsqllint/tsqllint/issues/120)
* Release v1.8.7 ([a790a93](https://github.com/tsqllint/tsqllint/commit/a790a93))
* Update install.js (#121) ([d5be486](https://github.com/tsqllint/tsqllint/commit/d5be486)), closes [#121](https://github.com/tsqllint/tsqllint/issues/121)



<a name="1.8.6"></a>
## <small>1.8.6 (2017-12-30)</small>

* Release v1.8.6 ([c3b2d48](https://github.com/tsqllint/tsqllint/commit/c3b2d48))
* Update appveyor publish command ([8b38952](https://github.com/tsqllint/tsqllint/commit/8b38952))



<a name="1.8.5"></a>
## <small>1.8.5 (2017-12-30)</small>

* Add standard and update js to comply (#115) ([759cb9f](https://github.com/tsqllint/tsqllint/commit/759cb9f)), closes [#115](https://github.com/tsqllint/tsqllint/issues/115)
* Add versioning script (#107) ([acdffff](https://github.com/tsqllint/tsqllint/commit/acdffff)), closes [#107](https://github.com/tsqllint/tsqllint/issues/107)
* Change downloaded zipped tar file to tgz ([e15282b](https://github.com/tsqllint/tsqllint/commit/e15282b))
* Fix Semicolon Termination Waitfor Bug (#118) ([caa9d81](https://github.com/tsqllint/tsqllint/commit/caa9d81)), closes [#118](https://github.com/tsqllint/tsqllint/issues/118)
* Implement Stylecop Analyzer (#113) ([26b0358](https://github.com/tsqllint/tsqllint/commit/26b0358)), closes [#113](https://github.com/tsqllint/tsqllint/issues/113)
* Release v1.8.5 ([700e8e8](https://github.com/tsqllint/tsqllint/commit/700e8e8))
* Remove .net framework from build targets (#109) ([35d7597](https://github.com/tsqllint/tsqllint/commit/35d7597)), closes [#109](https://github.com/tsqllint/tsqllint/issues/109)
* Remove path from dotnet argument in cover script ([f3e0fb0](https://github.com/tsqllint/tsqllint/commit/f3e0fb0))
* Remove unused templates, configs, and files (#110) ([ce45ffb](https://github.com/tsqllint/tsqllint/commit/ce45ffb)), closes [#110](https://github.com/tsqllint/tsqllint/issues/110)
* Tooling Updates (#108) ([b2fcd4e](https://github.com/tsqllint/tsqllint/commit/b2fcd4e)), closes [#108](https://github.com/tsqllint/tsqllint/issues/108)
* Update appveyor to publish tags only (#114) ([2fdc6a4](https://github.com/tsqllint/tsqllint/commit/2fdc6a4)), closes [#114](https://github.com/tsqllint/tsqllint/issues/114)
* Update dependecies & Reduce Complexity (#112) ([8b3237f](https://github.com/tsqllint/tsqllint/commit/8b3237f)), closes [#112](https://github.com/tsqllint/tsqllint/issues/112)
* Update dependencies and reduce complexity (#111) ([d00093f](https://github.com/tsqllint/tsqllint/commit/d00093f)), closes [#111](https://github.com/tsqllint/tsqllint/issues/111)
* Update tsqllint.js to use self contained binary ([f769a36](https://github.com/tsqllint/tsqllint/commit/f769a36))



<a name="1.8.4"></a>
## <small>1.8.4 (2017-12-12)</small>

* Add exclusion for Goto & Label Statements to SemicolonTermination Rule (#98) ([0031ea6](https://github.com/tsqllint/tsqllint/commit/0031ea6)), closes [#98](https://github.com/tsqllint/tsqllint/issues/98)
* Add functional test for plugins (#96) ([25e4dab](https://github.com/tsqllint/tsqllint/commit/25e4dab)), closes [#96](https://github.com/tsqllint/tsqllint/issues/96)
* Add unicode-string rule ([3eed3f8](https://github.com/tsqllint/tsqllint/commit/3eed3f8))
* Push artifacts to Github on Tag ([2c15c23](https://github.com/tsqllint/tsqllint/commit/2c15c23))
* Push artifacts to Github on Tag ([256c737](https://github.com/tsqllint/tsqllint/commit/256c737))
* Release v1.8.3 ([e1a481b](https://github.com/tsqllint/tsqllint/commit/e1a481b))
* Release v1.8.4 ([6b8341d](https://github.com/tsqllint/tsqllint/commit/6b8341d))
* Remove unused scripts (#103) ([d17a485](https://github.com/tsqllint/tsqllint/commit/d17a485)), closes [#103](https://github.com/tsqllint/tsqllint/issues/103)
* Update build configuration ([fc7d042](https://github.com/tsqllint/tsqllint/commit/fc7d042))
* Update Code Coverage Checks and Reporting (#99) ([f6fca2b](https://github.com/tsqllint/tsqllint/commit/f6fca2b)), closes [#99](https://github.com/tsqllint/tsqllint/issues/99)
* Update dependencies (#94) ([3aabc7a](https://github.com/tsqllint/tsqllint/commit/3aabc7a)), closes [#94](https://github.com/tsqllint/tsqllint/issues/94)
* Update install script to rely upon self contained deployment (#104) ([ed84c32](https://github.com/tsqllint/tsqllint/commit/ed84c32)), closes [#104](https://github.com/tsqllint/tsqllint/issues/104)
* Upgrade to net47 (#101) ([27a31b7](https://github.com/tsqllint/tsqllint/commit/27a31b7)), closes [#101](https://github.com/tsqllint/tsqllint/issues/101)



<a name="1.8.2"></a>
## <small>1.8.2 (2017-11-30)</small>

* Release v1.8.1 ([93ae19c](https://github.com/tsqllint/tsqllint/commit/93ae19c))
* Release v1.8.2 ([2747988](https://github.com/tsqllint/tsqllint/commit/2747988))
* Update cross-database-transaction to handle uncommited transactions (#89) ([8d132a3](https://github.com/tsqllint/tsqllint/commit/8d132a3)), closes [#89](https://github.com/tsqllint/tsqllint/issues/89)
* Update upper-lower rule to only flag comparisons in select statements (#91) ([96bd6eb](https://github.com/tsqllint/tsqllint/commit/96bd6eb)), closes [#91](https://github.com/tsqllint/tsqllint/issues/91)



<a name="1.8.0"></a>
## 1.8.0 (2017-11-29)

* Add concat-strings rule ([e08750a](https://github.com/tsqllint/tsqllint/commit/e08750a))
* Add cross-database-transaction rule ([f5af8f0](https://github.com/tsqllint/tsqllint/commit/f5af8f0))
* Release v1.8.0 ([23c0c7f](https://github.com/tsqllint/tsqllint/commit/23c0c7f))



<a name="1.7.0"></a>
## 1.7.0 (2017-11-28)

* Add Full Text Rule (#81) ([2e14485](https://github.com/tsqllint/tsqllint/commit/2e14485)), closes [#81](https://github.com/tsqllint/tsqllint/issues/81)
* Improve rule visitor builder performance (#83) ([bd79dbe](https://github.com/tsqllint/tsqllint/commit/bd79dbe)), closes [#83](https://github.com/tsqllint/tsqllint/issues/83)
* Release v1.7.0 ([8ab72fc](https://github.com/tsqllint/tsqllint/commit/8ab72fc))
* Remove newlines from plugin reporting (#79) ([3ee05bb](https://github.com/tsqllint/tsqllint/commit/3ee05bb)), closes [#79](https://github.com/tsqllint/tsqllint/issues/79)
* Update CommandLineOptionsTests file paths to work cross platform (#80) ([1386888](https://github.com/tsqllint/tsqllint/commit/1386888)), closes [#80](https://github.com/tsqllint/tsqllint/issues/80)
* Update full text rule column source (#82) ([de6848b](https://github.com/tsqllint/tsqllint/commit/de6848b)), closes [#82](https://github.com/tsqllint/tsqllint/issues/82)
* Update non-sargable rule to allow isnull when other filters exist (#85) ([4f80c4e](https://github.com/tsqllint/tsqllint/commit/4f80c4e)), closes [#85](https://github.com/tsqllint/tsqllint/issues/85)



<a name="1.6.1"></a>
## <small>1.6.1 (2017-11-17)</small>

*  Remove un-needed public methods from SQLFileProcessor (#71) ([744743b](https://github.com/tsqllint/tsqllint/commit/744743b)), closes [#71](https://github.com/tsqllint/tsqllint/issues/71)
* Add TravisCi Badge ([89e94a8](https://github.com/tsqllint/tsqllint/commit/89e94a8))
* Ensure plugin does not load twice ([035424d](https://github.com/tsqllint/tsqllint/commit/035424d))
* Improve RuleExceptionFinder Code Coverage (#69) ([8457e4d](https://github.com/tsqllint/tsqllint/commit/8457e4d)), closes [#69](https://github.com/tsqllint/tsqllint/issues/69)
* Port to project to dotnet standard ([aa735a2](https://github.com/tsqllint/tsqllint/commit/aa735a2))
* Refactor Command Line Parameter Parsing (#68) ([93dcf78](https://github.com/tsqllint/tsqllint/commit/93dcf78)), closes [#68](https://github.com/tsqllint/tsqllint/issues/68)
* Refactor to Prepare for Strategy Pattern Implementation (#66) ([0cd6da6](https://github.com/tsqllint/tsqllint/commit/0cd6da6)), closes [#66](https://github.com/tsqllint/tsqllint/issues/66)
* Release v1.6.0 ([ee5e680](https://github.com/tsqllint/tsqllint/commit/ee5e680))
* Release v1.6.1 ([60e99b5](https://github.com/tsqllint/tsqllint/commit/60e99b5))
* Remove unused constructor in SqlFileProcessor (#70) ([cbd2209](https://github.com/tsqllint/tsqllint/commit/cbd2209)), closes [#70](https://github.com/tsqllint/tsqllint/issues/70)
* Swap exec to spawn in tsqllint.js ([631bfe6](https://github.com/tsqllint/tsqllint/commit/631bfe6))
* Update build and install process to support osx (#77) ([66e26b1](https://github.com/tsqllint/tsqllint/commit/66e26b1)), closes [#77](https://github.com/tsqllint/tsqllint/issues/77)
* Update code coverage for dotnet core ([ef31247](https://github.com/tsqllint/tsqllint/commit/ef31247))



<a name="1.5.0"></a>
## 1.5.0 (2017-11-10)

* Add Feature to Allow Rule Disablement ([b9522e4](https://github.com/tsqllint/tsqllint/commit/b9522e4))
* Add feature to list plugins ([cfd71f9](https://github.com/tsqllint/tsqllint/commit/cfd71f9))
* Add Lib and Test assemblies to Costura Exclusion ([0184c6d](https://github.com/tsqllint/tsqllint/commit/0184c6d))
* Add package artifacts to .gitignore (#55) ([573ec07](https://github.com/tsqllint/tsqllint/commit/573ec07)), closes [#55](https://github.com/tsqllint/tsqllint/issues/55)
* Add rule for non-sargable queries ([1965ed4](https://github.com/tsqllint/tsqllint/commit/1965ed4))
* Add support for relative plugin paths (#63) ([abad3d9](https://github.com/tsqllint/tsqllint/commit/abad3d9)), closes [#63](https://github.com/tsqllint/tsqllint/issues/63)
* Add tracing ([5974363](https://github.com/tsqllint/tsqllint/commit/5974363))
* Consolodate tests into substitutes ([8dcdd18](https://github.com/tsqllint/tsqllint/commit/8dcdd18))
* Exclude test utility from coverage ([016afaa](https://github.com/tsqllint/tsqllint/commit/016afaa))
* Fix solution file name casing ([6945d7e](https://github.com/tsqllint/tsqllint/commit/6945d7e))
* Improve code statistics ([8f5a0ea](https://github.com/tsqllint/tsqllint/commit/8f5a0ea))
* Improve column calculation for non-sargable rule ([7bad81c](https://github.com/tsqllint/tsqllint/commit/7bad81c))
* Move RuleVisitor Type List to AutoGenerated Class ([d5d9336](https://github.com/tsqllint/tsqllint/commit/d5d9336))
* Refactor column counter for readability ([733a677](https://github.com/tsqllint/tsqllint/commit/733a677))
* Release v1.5.0 ([87c5009](https://github.com/tsqllint/tsqllint/commit/87c5009))
* Remove local variable in test helper ([c11427d](https://github.com/tsqllint/tsqllint/commit/c11427d))
* Remove single line comment validation from StyleCop ([ff8909a](https://github.com/tsqllint/tsqllint/commit/ff8909a))
* Rename line variables in column position function ([910f754](https://github.com/tsqllint/tsqllint/commit/910f754))
* Report failure to find plugin (#56) ([65ef30f](https://github.com/tsqllint/tsqllint/commit/65ef30f)), closes [#56](https://github.com/tsqllint/tsqllint/issues/56)
* Suppress help text during config file init ([9f72993](https://github.com/tsqllint/tsqllint/commit/9f72993))
* Update AssemblyInfo ([5d1cab0](https://github.com/tsqllint/tsqllint/commit/5d1cab0))
* Update readme ([1398432](https://github.com/tsqllint/tsqllint/commit/1398432))
* Update README.md ([1f79e8c](https://github.com/tsqllint/tsqllint/commit/1f79e8c))



<a name="1.4.1"></a>
## <small>1.4.1 (2017-10-19)</small>

* Release v1.4.1 ([6de9614](https://github.com/tsqllint/tsqllint/commit/6de9614))
* Remove cross database error reporting for linked server queries ([4745c6c](https://github.com/tsqllint/tsqllint/commit/4745c6c))
* Update README, add new rules ([71ca03b](https://github.com/tsqllint/tsqllint/commit/71ca03b))



<a name="1.4.0"></a>
## 1.4.0 (2017-10-14)

* Add cross database rule ([3ea6647](https://github.com/tsqllint/tsqllint/commit/3ea6647))
* Add linked server rule ([7c19fe6](https://github.com/tsqllint/tsqllint/commit/7c19fe6))
* Create template for new rules ([875367c](https://github.com/tsqllint/tsqllint/commit/875367c))
* Improve CommandLineOptionHandler readability ([79a0a78](https://github.com/tsqllint/tsqllint/commit/79a0a78))
* Refactor rules tests into separate files ([ceb1fb0](https://github.com/tsqllint/tsqllint/commit/ceb1fb0))
* Release v1.4.0 ([66648bc](https://github.com/tsqllint/tsqllint/commit/66648bc))
* Remove dead code in rule visitor ([8e3ba9b](https://github.com/tsqllint/tsqllint/commit/8e3ba9b))
* Remove unused directives ([4c218cf](https://github.com/tsqllint/tsqllint/commit/4c218cf))



<a name="1.3.0"></a>
## 1.3.0 (2017-10-11)

* Create CODE_OF_CONDUCT.md ([a4d20b4](https://github.com/tsqllint/tsqllint/commit/a4d20b4))
* Document usage in external tools ([9ad3a74](https://github.com/tsqllint/tsqllint/commit/9ad3a74))
* Release v1.3.0 ([2ba3110](https://github.com/tsqllint/tsqllint/commit/2ba3110))
* Remove BEGIN semicolon termination requirement ([8b948ac](https://github.com/tsqllint/tsqllint/commit/8b948ac))
* Remove violations list from rule visitor ([68f1026](https://github.com/tsqllint/tsqllint/commit/68f1026))
* Update exit status code to return 1 for linting errors ([5091ffa](https://github.com/tsqllint/tsqllint/commit/5091ffa))



<a name="1.2.0"></a>
## 1.2.0 (2017-10-08)

* Add coverage for config reader ([da26ca2](https://github.com/tsqllint/tsqllint/commit/da26ca2))
* Add coverage for integration tests ([12b06de](https://github.com/tsqllint/tsqllint/commit/12b06de))
* Add plugin framework (#48) ([ab46f96](https://github.com/tsqllint/tsqllint/commit/ab46f96)), closes [#48](https://github.com/tsqllint/tsqllint/issues/48)
* Add test for create partioned view ([13a63c2](https://github.com/tsqllint/tsqllint/commit/13a63c2))
* Add tests for in memory config ([f2a227b](https://github.com/tsqllint/tsqllint/commit/f2a227b))
* Automatically create config file (#47) ([0c0c084](https://github.com/tsqllint/tsqllint/commit/0c0c084)), closes [#47](https://github.com/tsqllint/tsqllint/issues/47)
* Clean up dead code ([29a891c](https://github.com/tsqllint/tsqllint/commit/29a891c))
* Document Plugin config and usage ([b28fa68](https://github.com/tsqllint/tsqllint/commit/b28fa68))
* Refactor functional tests ([6ad4e3c](https://github.com/tsqllint/tsqllint/commit/6ad4e3c))
* Release v1.2.0 ([00d8315](https://github.com/tsqllint/tsqllint/commit/00d8315))
* Remove caching from appveyor config ([3fd33c1](https://github.com/tsqllint/tsqllint/commit/3fd33c1))
* Remove Global Nuget ([c3dfa84](https://github.com/tsqllint/tsqllint/commit/c3dfa84))
* Simplify command line and parsing and config handling ([af7ce65](https://github.com/tsqllint/tsqllint/commit/af7ce65))
* Standardize styling (#49) ([189c16a](https://github.com/tsqllint/tsqllint/commit/189c16a)), closes [#49](https://github.com/tsqllint/tsqllint/issues/49)
* Update IntegrationTests ([3380ca9](https://github.com/tsqllint/tsqllint/commit/3380ca9))
* Update project namespaces ([97517f4](https://github.com/tsqllint/tsqllint/commit/97517f4))
* Update reference to TSQLLint.Common ([fd787b9](https://github.com/tsqllint/tsqllint/commit/fd787b9))



<a name="1.1.5"></a>
## <small>1.1.5 (2017-09-18)</small>

* Add set variable rule (#40) ([c8554d1](https://github.com/tsqllint/tsqllint/commit/c8554d1)), closes [#40](https://github.com/tsqllint/tsqllint/issues/40)
* Fix directory doesnt exist bug (#39) ([587765b](https://github.com/tsqllint/tsqllint/commit/587765b)), closes [#39](https://github.com/tsqllint/tsqllint/issues/39)
* Fix special character bug in keyword-capitalization rule ([f50a749](https://github.com/tsqllint/tsqllint/commit/f50a749))
* Release v1.1.5 ([8257f47](https://github.com/tsqllint/tsqllint/commit/8257f47))
* Update semicolon rule to correctly parse subqueries in create statements ([a5c82b7](https://github.com/tsqllint/tsqllint/commit/a5c82b7))



<a name="1.1.4"></a>
## <small>1.1.4 (2017-08-30)</small>

* Add more instructions to installation (#34) ([3d37684](https://github.com/tsqllint/tsqllint/commit/3d37684)), closes [#34](https://github.com/tsqllint/tsqllint/issues/34)
* Fix exit code for help option (#30) ([07e5944](https://github.com/tsqllint/tsqllint/commit/07e5944)), closes [#30](https://github.com/tsqllint/tsqllint/issues/30)
* Fix references to APPDATA (#36) ([7cee690](https://github.com/tsqllint/tsqllint/commit/7cee690)), closes [#36](https://github.com/tsqllint/tsqllint/issues/36)
* Release v1.1.4 ([c638d49](https://github.com/tsqllint/tsqllint/commit/c638d49))
* Specify node engine in package.json (#35) ([16dfff2](https://github.com/tsqllint/tsqllint/commit/16dfff2)), closes [#35](https://github.com/tsqllint/tsqllint/issues/35)



<a name="1.1.3"></a>
## <small>1.1.3 (2017-08-24)</small>

* Add download badge ([d0b3d7b](https://github.com/tsqllint/tsqllint/commit/d0b3d7b))
* Build package in CI (#20) ([cb984ec](https://github.com/tsqllint/tsqllint/commit/cb984ec)), closes [#20](https://github.com/tsqllint/tsqllint/issues/20)
* Cache the final NuGet package installed files (#13) ([f555f8a](https://github.com/tsqllint/tsqllint/commit/f555f8a)), closes [#13](https://github.com/tsqllint/tsqllint/issues/13)
* Fix assembly versioning script ([218bb20](https://github.com/tsqllint/tsqllint/commit/218bb20))
* Fix syntax error to show "error" instead of "off" (#11) ([217cb42](https://github.com/tsqllint/tsqllint/commit/217cb42)), closes [#11](https://github.com/tsqllint/tsqllint/issues/11)
* Fix Windows Git Bash Install (#17) ([d47d0e8](https://github.com/tsqllint/tsqllint/commit/d47d0e8)), closes [#17](https://github.com/tsqllint/tsqllint/issues/17)
* Improve error reporting (#15) ([9cc4c58](https://github.com/tsqllint/tsqllint/commit/9cc4c58)), closes [#15](https://github.com/tsqllint/tsqllint/issues/15)
* Install ScriptDom dependency when it doesnt exist on host machine (#22) ([175b25c](https://github.com/tsqllint/tsqllint/commit/175b25c)), closes [#22](https://github.com/tsqllint/tsqllint/issues/22)
* Release v1.1.2 ([70848f9](https://github.com/tsqllint/tsqllint/commit/70848f9))
* Release v1.1.3 ([517cd6b](https://github.com/tsqllint/tsqllint/commit/517cd6b))
* Remove the NuGet IP from AppVeyor (#12) ([f8803ac](https://github.com/tsqllint/tsqllint/commit/f8803ac)), closes [#12](https://github.com/tsqllint/tsqllint/issues/12)
* Use npm config prefix for postinstall script (#28) ([c5fa835](https://github.com/tsqllint/tsqllint/commit/c5fa835)), closes [#28](https://github.com/tsqllint/tsqllint/issues/28)
* Use repository short-hand in package.json (#14) ([c813eed](https://github.com/tsqllint/tsqllint/commit/c813eed)), closes [#14](https://github.com/tsqllint/tsqllint/issues/14)
* Wildcards (#26) ([b0f9ed9](https://github.com/tsqllint/tsqllint/commit/b0f9ed9)), closes [#26](https://github.com/tsqllint/tsqllint/issues/26)



<a name="1.1.1"></a>
## <small>1.1.1 (2017-08-04)</small>

* Add default rules ([3d0d5bb](https://github.com/tsqllint/tsqllint/commit/3d0d5bb))
* Add directory walking to sqlparser ([1844db2](https://github.com/tsqllint/tsqllint/commit/1844db2))
* Add file list processing ([6fb35e1](https://github.com/tsqllint/tsqllint/commit/6fb35e1))
* Add guardrail to prevent config file clobbering ([dfd9049](https://github.com/tsqllint/tsqllint/commit/dfd9049))
* Change error response for missing lint path ([e684da8](https://github.com/tsqllint/tsqllint/commit/e684da8))
* Create linting and confing handler ([1d1708c](https://github.com/tsqllint/tsqllint/commit/1d1708c))
* Fix bug with MultiTableAliasRule and CTE ([a0b86b5](https://github.com/tsqllint/tsqllint/commit/a0b86b5))
* Improve command line interactions ([2f6120c](https://github.com/tsqllint/tsqllint/commit/2f6120c))
* Improve commandline option handling ([d3ec93b](https://github.com/tsqllint/tsqllint/commit/d3ec93b))
* Init ([aa8cc30](https://github.com/tsqllint/tsqllint/commit/aa8cc30))
* Release 0.1.30 ([9b158c4](https://github.com/tsqllint/tsqllint/commit/9b158c4))
* Release v1.0.0 ([6d14826](https://github.com/tsqllint/tsqllint/commit/6d14826))
* Release v1.0.1 ([9d36e5e](https://github.com/tsqllint/tsqllint/commit/9d36e5e))
* Release v1.0.2 ([e3f7a74](https://github.com/tsqllint/tsqllint/commit/e3f7a74))
* Release v1.1.0 ([ca614f3](https://github.com/tsqllint/tsqllint/commit/ca614f3))
* Release v1.1.1 ([9bd7eb4](https://github.com/tsqllint/tsqllint/commit/9bd7eb4))
* Standardize rule text ([197a3b8](https://github.com/tsqllint/tsqllint/commit/197a3b8))