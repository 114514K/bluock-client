module.exports = {
  "extends": "stylelint-config-recommended",
  "rules": {
    "block-no-empty": [
      true,
      {
        "severity": "warning",
        "message": "Consider deleting this empty block",
        "ignore": ["comments"]
      }
    ],
    "color-named": [
      "never",
      {
        "severity": "warning",
        "message": "please avoid using named color"
      }
    ],
    // Enforce the case of properties to lower case
    //   | .hoge {
    //   |   Color: #ff0000; // <- don't do this, use "color" instead
    //   | }
    "property-case": "lower",
    // Ask for trailing semicolons.
    //   | .hoge {
    //   |   color: #ff0000;
    //   |   padding: 1em; // <- This semicolon
    //   | }
    "declaration-block-trailing-semicolon": "always",
    // Disallow end-of-line whitespaces.
    //  | color: #ff0000;･････ // <- This whitespace (represented in "･")
    "no-eol-whitespace": true
  }
}
