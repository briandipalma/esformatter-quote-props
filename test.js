'use strict';

var assert = require('assert');

var mocha = require('mocha');
var esformatter = require('esformatter');

var quotePropsPlugin = require('./');

esformatter.register(quotePropsPlugin);

mocha.describe('quote props plugin', function() {
	mocha.it('should remove quotes around properties', function() {
		// Given.
		var codeStr = "var obj = {\
			'dropDown': 'setField'\
		}";

		// When.
		var formattedCode = esformatter.format(codeStr);

		// Then.
		assert.equal(formattedCode, "var obj = {\n" +
			"  dropDown: 'setField'\n" +
		"}");
	});

});
