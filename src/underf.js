/**
* UnderF.JS
* JavaScript Functional Library
* 
* Author: Benjamin Pelc
* Date: 08/02/15
*
* About: A functional programming library based on the rules and patterns in LambdaJS (github/loop-recur/lambdajs)
*
* Rules (From LambdaJS):
*	1) Data always comes last. 
*	2) EVERYTHING is curried.
*	3) Everything is a pure function.
* 
* To use load the module in Node or the browser as follows:
* 	Node: var _f = require('underf.js')
*	Browser: <script src='underf.js'></script>
* Functions will now be accessable through _f.<functionName> (i.e. _f.curry)
*/

/* Fundamentals */
(function(exports) {

/**
* curry
*/
exports.curry = function (fn, fnLength) {
	fnLength = fnLength || fn.length;
	return function () {
		var suppliedArgs = Array.prototype.slice.call(arguments);
		if (suppliedArgs.length >= fn.length) {
return fn.apply(this, suppliedArgs);
		} else if (!suppliedArgs.length) {
			return fn;
		} else {
			return exports.curry(fn.bind.apply(fn, [this].concat(suppliedArgs)), fnLength - suppliedArgs.length);
		}
	};
};

/**
* compose 
*/
exports.compose = function() {
	var funcs = arguments;
	return function() {
		var args = arguments;
		for (var i = funcs.length; i --> 0;) {
			args = [funcs[i].apply(this, args)];
		}
		return args[0];
	};
};

/**
* fold 
*/
exports.fold = exports.curry(function(func, init, xs) {
	return xs.reduce(func, init);
});

/**
* map 
*/
exports.map = exports.curry(function(func, xs){
	return xs.map(func);
});

/**
* filter 
*/
// filter :: (a -> Bool) -> [a] -> [a]
exports.filter = exports.curry(function(func, xs) {
	return xs.filter(func);
});

/**
* add 
* return the addition of a and b
*/
//+ add :: a -> b -> a | b
exports.add = exports.curry(function(a, b) {
	return a + b;
});

/**
* subtract 
* subtract a from b (data last)
*/
//+ subtract :: num -> num -> num
exports.subtract = exports.curry(function(a, b){
	return b - a;
});

/** mult 
* multiply two numbers a and b
*/
//+ mult :: num -> num -> num 
exports.mult = exports.curry(function(a, b) {
	return a * b;
});

/**
* div 
* divide b by a (data last)
*/
//+ div :: num -> num -> num 
exports.div = exports.curry(function(a, b) {
	return b / a;
});

/**
* square
* square a number.
* eg square(3) = 9
*/
//+ square :: num -> num 
exports.square = function(a) {
	return a * a;
};

/******************************************************************************
STRING FUNCTIONS
******************************************************************************/

/**
 * split 
 * split the string around the expression
 */
//+ split :: exp -> str -> str
exports.split = exports.curry(function(expr, str) {
	return str.split(expr);
});

/**
* splitFirst
* the first substring from split around expr 
*/
//+ splitFirst :: exp -> str -> [str] 
exports.splitFirst = exports.curry(function(expr, str) {
	return str.split(expr)[0];
});

/**
* splitLast
* return the last substring from split around expr 
*/
//+ splitLast :: expr -> str -> str 
exports.splitLast = exports.curry(function(expr, str) {
	var splits = str.split(expr);
	return str.split(expr)[splits.length - 1];
});

/**
* splitN
* return the nth substring of split about expr 
*/
//+ splitN :: expr -> int -> str -> str 
exports.splitN = exports.curry(function(expr, n, str) {
	return str.split(expr)[n];
});

/*******************************************************************************
ARRAY
*******************************************************************************/

/**
* array2str 
* collapse an array down to a string 
*/
//+ array2str : [a] -> str
exports.array2str = function(xs) {
	return exports.fold(exports.add, "", xs);
};

/*******************************************************************************
HTML 
*******************************************************************************/

/**
* htmlTagger
* wrap a string in html tags 
*/
//+ htmlTagger :: tag (str) -> str -> str 
exports.htmlTagger = exports.curry(function(tag, str) {
	return '<' + tag + '>' + str + '</' + tag + '>';
});

exports.htmlAddAttribute = exports.curry(function(attr, val, str) {
	var regex = />/;
	if (str.match(regex)) {
		return str.replace(regex, ' ' + attr + '="' + val + '">');
	}
	return str;
});


return exports;

})(typeof exports === 'undefined' ? this._f = {} : exports); // Node or Browser?

