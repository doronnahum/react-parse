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


const onSuccess = function(type, action, status){
	if(_onSuccess){
		_onSuccess(action, status)
	}	
}
const onError = function(type, action, status){
	if(_onError){
		_onError(action, status)
	}
}

const Logger = {
	onSuccess,
	onError
}
export default Logger;