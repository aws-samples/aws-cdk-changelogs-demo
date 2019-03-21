<!--
  0.15.0 (2018-09-01)
  ==================

  This version should NOT show up in the changelog because the version is inside a top level
  HTML comment that should have been stripped out of the file because it would be invisible.
 -->

0.14.127 / (2018-08-01)
====================

  * `<!-- TEST CONTENT -->` There should be an inline markdown code block with
  an HTML comment that stays in the source.

  ```
    Multi line code block, that has a comment in it:
    <!-- TEST CONTENT -->
    There should be a TEST CONTENT HTML comment above this line
  ```

0.14.124 / (2018-07-01)
====================

  * An opening comment tag in an inline code block: `<!--` TEST CONTENT `-->`.
  * If you don't see TEST CONTENT in plaintext between two inline code blocks that have
  an opening HTML comment tag and then a closing HTML comment tag then the parser messed up