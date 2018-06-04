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
		global.ErrorHandle = mod.exports;
	}
})(this, function (exports, _api) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = errorHandle;
	function errorHandle(error, params) {
		if (_api.handleError) {
			(0, _api.handleError)(error, params);
		}
	};
});