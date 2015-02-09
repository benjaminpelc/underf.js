/**
* Node tests: Requires Mocha.JS, Chai.JS 
*/

var assert = require('./vendor/chai').assert;
var _f = require('../src/underf');

describe('Maths utility functions', function() {
	describe('add', function(){
		it('Should be equal to 5', function(){
			assert.equal(5, _f.add(2, 3));
		});

		it('should return a function when given one argument', function() {
			assert.typeOf(_f.add(2), 'function');
		});
		
		it('should work as a curried function', function() {
			assert.equal(9, _f.add(5)(4));
		});

		it('should return a string if one argument is a string', function() {
			assert.typeOf(_f.add('2', 2), 'string', 'Adding "2" and 2');
			assert.typeOf(_f.add(2,'2'), 'string');
		});
	});

	describe('square', function() {
		it('Should be equal to 9', function() {
			assert.equal(9, _f.square(3));
		});
	});
});

describe('String Methods', function() {
	describe('split', function() {
		it('should return ["ben", "pelc"]', function() {
			assert.deepEqual(_f.split('-', 'ben-pelc'), ['ben','pelc']);
		});
		it('should work with regex', function() {
			assert.deepEqual(_f.split(/>/, 'ben>pelc'), ['ben', 'pelc']);
		});
	});

	describe('splitfirst', function() {
		it('should return "woah"', function() {
			assert.equal(_f.splitFirst(/<s>/, 'woah<s>tiger'), 'woah');
		});
	});

	describe('splitLast', function() {
		it('should return "now"', function() {
			assert.equal(_f.splitLast(/<s>/, 'stop<s>that<s>now'), 'now');
		});
	});

	describe('splitN', function() {
		it('should return "09"', function() {
			assert.equal(_f.splitN(/xx/, 1, '1993xx09xx30'), '09');
		});
	});
});

describe('Array Functions', function() {
	describe('array2str', function() {
		it('should return a string', function() {
			assert.typeOf(_f.array2str(['ben',2,[1,1]]), 'string');
		});
	});
});

describe('HTML Functions', function() {
	describe('htmlTagger', function() {
		it('should return "<h1>Hello, World!</h1>"', function() {
			assert.equal(_f.htmlTagger('h1', 'Hello, World!'), '<h1>Hello, World!</h1>');	
		});
	});

	describe('htmlAddAttribute', function() {
		it('should return "<option value="a-value">string</option>"', function() {
			assert.equal(_f.htmlAddAttribute('value', 'a-value', '<option>string</option>'), '<option value="a-value">string</option>');
		});
	});
});
