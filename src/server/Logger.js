let _onSuccess
let _onError
/**
 * setLoggerHandlers
 * @param {*} payload object
 * @param {Function} payload.onSuccess
 * @param {Function} payload.onError
 */
export const setLoggerHandlers = function(payload){
	if(payload && payload.onSuccess){
		_onSuccess = payload.onSuccess
	}
	if(payload && payload.onError){
		_onError = payload.onError
	}
}


const onSuccess = function(type, action, status, res){
	if(_onSuccess){
		_onSuccess(action, status)
	}
	if(action.onSuccess){
		action.onSuccess({type, action, status, res})
	}
}
const onError = function(type, action, status, res){
	if(_onError){
		_onError(action, status)
	}
	if(action.onSuccess){
		action.onError({type, action, status, res})
	}
}

const Logger = {
	onSuccess,
	onError
}
export default Logger;