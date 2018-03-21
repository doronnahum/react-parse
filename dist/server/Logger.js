(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './api'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./api'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.api);
		global.Logger = mod.exports;
	}
})(this, function (exports, _api) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});


	var onSuccses = function onSuccses(action, status) {
		if (_api.resultLogger.onSuccses) {
			_api.resultLogger.onSuccses(action, status);
		}
	};
	var onError = function onError(action, status) {
		if (_api.resultLogger.onError) {
			_api.resultLogger.onError(action, status);
		}
	};

	var Logger = {
		onSuccses: onSuccses,
		onError: onError
	};
	exports.default = Logger;
});