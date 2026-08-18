// JavaScript Document
import {form, userNameInput, passwordInput, backSvg} from './auth-svg-handler.js';
import {login} from '../apis/auth.js';
import {loginErrorHandler} from './error-handler.js';
import {tokenName} from '../libs/constants.js';

backSvg.addEventListener('click', ()=> location.href='/index');

form.addEventListener('submit',async (event)=>{
	event.preventDefault();
	let userNameInputValue=userNameInput.value;
	let passwordInputValue=passwordInput.value;
	let data={username:userNameInputValue, password:passwordInputValue};
	try{
	  let resBody= await login(data);
		localStorage.setItem(tokenName,resBody.token)
		console.log(resBody);
//		location.href='/login';
	}catch(error){
		loginErrorHandler(error);
	}
})