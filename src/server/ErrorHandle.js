import {handleError} from './api'

export default function errorHandle(error, params) {
	if(handleError){
		handleError(error, params)
	}
};