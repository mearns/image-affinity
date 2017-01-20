// Override configuration for src files which will be written in ES2015 (ES6) and JSX,
// and transpiled by babel for webpack.

module.exports = {
    env: {
        "es6": true
    },

    parserOptions: {
        "sourceType": "module"
    },

    extends: ["eslint:recommended", "plugin:react/recommended"],

    plugins: [
        "react"
    ],

    ecmaFeatures: {
        "arrowFunctions": true,
        "binaryLiterals": true,
        "blockBindings": true,
        "classes": true,
        "defaultParams": true,
        "destructuring": true,
        "forOf": true,
        "generators": true,
        "modules": true,
        "objectLiteralComputedProperties": true,
        "objectLiteralDuplicateProperties": true,
        "objectLiteralShorthandMethods": true,
        "objectLiteralShorthandProperties": true,
        "octalLiterals": true,
        "regexUFlag": true,
        "regexYFlag": true,
        "spread": true,
        "superInFunctions": true,
        "templateStrings": true,
        "unicodeCodePointEscapes": true,
        "globalReturn": true
    },

    rules: {
        "no-process-env": 2
    }
};
