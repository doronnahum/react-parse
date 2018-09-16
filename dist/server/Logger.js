(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.Logger = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var _onSuccess = void 0;
	var _onError = void 0;
	/**
  * setLoggerHandlers
  * @param {*} payload object
  * @param {Function} payload.onSuccess
  * @param {Function} payload.onError
  */
	var setLoggerHandlers = exports.setLoggerHandlers = function setLoggerHandlers(payload) {
		if (payload && payload.onSuccess) {
			_onSuccess = payload.onSuccess;
		}
		if (payload && payload.onError) {
			_onError = payload.onError;
		}
	};

	var onSuccess = function onSuccess(type, action, status, res) {
		if (_onSuccess) {
			_onSuccess(action, status);
		}
		if (action.payload.onSuccess) {
			action.payload.onSuccess({ type: type, action: action, status: status, res: res });
		}
	};
	var onError = function onError(type, action, status, res) {
		if (_onError) {
			_onError(action, status);
		}
		if (action.payload.onError) {
			action.onError({ type: type, action: action, status: status, res: res });
		}
	};

	var Logger = {
		onSuccess: onSuccess,
		onError: onError
	};
	exports.default = Logger;
});