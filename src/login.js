// JavaScript Document
import {form, userNameInput, passwordInput, backSvg} from './auth-svg-handler.js';
import {login} from '../apis/auth.js';
import {loginErrorHandler} from './error-handler.js';
import {tokenName} from '../libs/constants.js';
import {showToast} from './show-toast.js';

backSvg.addEventListener('click', ()=> location.href='/index');

form.addEventListener('submit',async (event)=>{
	event.preventDefault();
	let userNameInputValue=userNameInput.value;
	let passwordInputValue=passwordInput.value;
	let data={username:userNameInputValue, password:passwordInputValue};
	try{
	  let resBody= await login(data);
		showToast('Welcome back! You’ve successfully logged in.', 'success')
		localStorage.setItem(tokenName,resBody.token);
		setTimeout( () => {location.href = '/home';}, 3000);
		console.log(resBody);
//		location.href='/login';
	}catch(error){
		loginErrorHandler(error);
	}
})