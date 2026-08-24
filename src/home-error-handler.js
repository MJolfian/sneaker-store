// JavaScript Document
import {showToast} from './show-toast.js';

const sysError = {
	403 : 'Forbidden access. you should signup or login again.'
}

export const homeErrorHandler = error => {
	const serverMsg=error.response?.data?.message;
	let msg = sysError[error.status] || serverMsg;
	 if (Array.isArray(msg)) showToast(msg.join(', '));
     else if (typeof msg === 'string') showToast(msg);
     if(error.status===403){
		setTimeout(()=>{
			location.href='/login';
		},5000)
	}
}