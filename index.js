'use strict';

var tk = require('rocambole-token');
var unquotedValidator = require('unquoted-property-validator');

module.exports.nodeBefore = function(node) {
	if (isQuotedProperty(node) && isSafeToUnquote(node)) {
		unquoteProperty(node);
	}
//
//	if (node.type === 'Identifier' && node.parent.type === 'Property' && node.parent.key === node) {
//		console.log(node);
//	}
};

// A literal who's parent is type Property and who's key is the node parameter
function isQuotedProperty(node) {
	return node.type === 'Literal' && node.parent.type === 'Property' && node.parent.key === node;
}

function isSafeToUnquote(node) {
	return true;
}

function unquoteProperty(node) {
	var block = {
		name: node.value,
		range: node.range,
		type: 'Identifier',
		parent: node.parent,
		endToken: node.endToken,
		startToken: node.startToken
	};

	node.startToken.type = 'Identifier';
	node.startToken.value = node.value;
	node.parent.key = block;
}
