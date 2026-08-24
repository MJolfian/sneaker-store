// JavaScript Document
import {signup} from '../apis/auth.js';
import {signUpErrorHandler, clearErrors} from './error-handler.js';
import {form, userNameInput, passwordInput, backSvg} from './auth-svg-handler.js';
import {showToast} from './show-toast.js'

backSvg.addEventListener('click', ()=> location.href='/index');

form.addEventListener('submit',async (event)=>{
	clearErrors();
	event.preventDefault();
	let userNameInputValue=userNameInput.value;
	let passwordInputValue=passwordInput.value;
	let data={username:userNameInputValue, password:passwordInputValue};
	try{
	  let resBody= await signup(data);
		showToast('Account created successfully. Welcome aboard!', 'success');
		setTimeout( () => {location.href='/login';}, 3000);
	  console.log(resBody);
	}catch(error){
		signUpErrorHandler(error);
		
	}
})