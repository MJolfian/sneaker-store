// JavaScript Document
import {usernameErr, passwordErr, sysErr} from './auth-svg-handler.js';

function showErrors(msg){
		clearErrors();
		if(msg.includes('username')){
			usernameErr.classList.remove('hidden');
			usernameErr.textContent += msg + '. ';
		}else if(msg.includes('password')){
			passwordErr.classList.remove('hidden');
			passwordErr.append(msg + '. ');
		}else{
			sysErr.classList.remove('hidden');
			sysErr.append(msg + '. ')
		}
	}
	
export function clearErrors(){
	usernameErr.textContent='';
	passwordErr.textContent='';
	sysErr.textContent='';
	usernameErr.classList.add('hidden');
	passwordErr.classList.add('hidden');
	sysErr.classList.add('hidden');
}

export const signUpErrorHandler = error => {  // to signup.js
	const msg=error.response?.data?.message;
	 if (Array.isArray(msg)) msg.forEach(showErrors);
     else if (typeof msg === 'string') showErrors(msg);
     else showErrors('Something Went Wrong');
    };
	
export const loginErrorHandler = error => {  // to login.js
	const msg=error.response?.data?.message;
	 if (Array.isArray(msg)) msg.forEach(showErrors);
     else if (typeof msg === 'string') showErrors(msg);
     else showErrors('Something Went Wrong');
    };