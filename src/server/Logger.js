import {resultLogger} from './api'

const onSuccses = function(action, status){
	if(resultLogger.onSuccses){
		resultLogger.onSuccses(action, status)
	}	
}
const onError = function(action, status){
			if(resultLogger.onError){
				resultLogger.onError(action, status)
			}
}

const Logger = {
	onSuccses,
	onError
}
export default Logger;