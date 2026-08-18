// JavaScript Document
import {signup} from '../apis/auth.js';
import {signUpErrorHandler} from './error-handler.js';

const envelopeSvg=document.getElementById('envelopeSvg');
const lockSvg=document.getElementById('lockSvg');
let eyeSvg=document.getElementById('eyeSvg');
const userNameInput=document.getElementById('username');
const passwordInput=document.getElementById('password');
const form=document.querySelector('form');
const signUpBtn=document.querySelector('#signup-btn');
export let usernameErr=form.querySelector('#username-err');
export let passwordErr=form.querySelector('#password-err');
export let sysErr=form.querySelector('#sys-err');
let isVisible=false;

const insertInsideEnvelopeSvg=()=>envelopeSvg.innerHTML=`<path fill-rule="evenodd" clip-rule="evenodd" d="M0.04375 1.36063C0.131966 0.974088 0.348823 0.628961 0.658806 0.38177C0.968789 0.134578 1.35352 -2.66826e-05 1.75 3.96737e-09H12.25C12.6465 -2.66826e-05 13.0312 0.134578 13.3412 0.38177C13.6512 0.628961 13.868 0.974088 13.9563 1.36063L7 5.61225L0.04375 1.36063ZM0 2.35987V8.57587L5.07762 5.46263L0 2.35987ZM5.91587 5.97625L0.167125 9.49988C0.309161 9.79937 0.533336 10.0524 0.813559 10.2294C1.09378 10.4065 1.41853 10.5003 1.75 10.5H12.25C12.5814 10.5001 12.906 10.406 13.1861 10.2288C13.4662 10.0516 13.6902 9.79853 13.832 9.499L8.08325 5.97538L7 6.63775L5.91587 5.97538V5.97625ZM8.92237 5.4635L14 8.57587V2.35987L8.92237 5.46263V5.4635Z" fill="currentColor"/>`;
const insertInsideLockSvg=()=>lockSvg.innerHTML=`<g clip-path="url(#clip0_1_12324)">
<path d="M2.1875 7.875C2.1875 7.41087 2.37187 6.96575 2.70006 6.63756C3.02825 6.30937 3.47337 6.125 3.9375 6.125H10.0625C10.5266 6.125 10.9717 6.30937 11.2999 6.63756C11.6281 6.96575 11.8125 7.41087 11.8125 7.875V12.25C11.8125 12.7141 11.6281 13.1592 11.2999 13.4874C10.9717 13.8156 10.5266 14 10.0625 14H3.9375C3.47337 14 3.02825 13.8156 2.70006 13.4874C2.37187 13.1592 2.1875 12.7141 2.1875 12.25V7.875Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.9375 3.5C3.9375 2.68777 4.26016 1.90882 4.83449 1.33449C5.40882 0.760155 6.18777 0.4375 7 0.4375C7.81223 0.4375 8.59118 0.760155 9.16551 1.33449C9.73984 1.90882 10.0625 2.68777 10.0625 3.5V6.125H9.1875V3.5C9.1875 2.91984 8.95703 2.36344 8.5468 1.9532C8.13656 1.54297 7.58016 1.3125 7 1.3125C6.41984 1.3125 5.86344 1.54297 5.4532 1.9532C5.04297 2.36344 4.8125 2.91984 4.8125 3.5V6.125H3.9375V3.5Z" fill="currentColor"/>
</g>
<defs>
<clipPath id="clip0_1_12324">
<rect width="14" height="14" fill="white"/>
</clipPath>
</defs>`;
const insertInsideEyeSvg=()=>eyeSvg.innerHTML=`<path d="M9.44125 11.298L8.029 9.88487C7.48286 10.0801 6.8925 10.1163 6.32662 9.98915C5.76073 9.862 5.24259 9.57678 4.83247 9.16666C4.42235 8.75654 4.13712 8.23839 4.00998 7.67251C3.88283 7.10662 3.91899 6.51626 4.11425 5.97012L2.31175 4.16762C0.82075 5.49325 0 7 0 7C0 7 2.625 11.8125 7 11.8125C7.84035 11.8096 8.6712 11.6345 9.44125 11.298ZM4.55875 2.702C5.3288 2.3655 6.15964 2.19039 7 2.1875C11.375 2.1875 14 7 14 7C14 7 13.1784 8.50588 11.6891 9.83325L9.88488 8.029C10.0801 7.48286 10.1163 6.8925 9.98915 6.32662C9.862 5.76073 9.57678 5.24258 9.16666 4.83247C8.75654 4.42235 8.23839 4.13712 7.67251 4.00998C7.10662 3.88283 6.51626 3.91899 5.97013 4.11425L4.55875 2.70288V2.702Z" fill="currentColor"/>
<path d="M4.83457 6.69034C4.78644 7.02661 4.81728 7.36947 4.92466 7.69175C5.03204 8.01404 5.213 8.30688 5.4532 8.54708C5.69341 8.78729 5.98625 8.96825 6.30853 9.07562C6.63081 9.183 6.97367 9.21385 7.30994 9.16572L4.83369 6.69034H4.83457ZM9.16582 7.30984L6.69044 4.83359C7.02672 4.78546 7.36958 4.81631 7.69186 4.92369C8.01414 5.03106 8.30698 5.21202 8.54719 5.45223C8.78739 5.69243 8.96835 5.98527 9.07573 6.30756C9.18311 6.62984 9.21395 6.9727 9.16582 7.30897V7.30984Z" fill="currentColor"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.9404 12.5597L1.44043 2.05969L2.05993 1.44019L12.5599 11.9402L11.9404 12.5597Z" fill="currentColor"/>`;

insertInsideEnvelopeSvg();
insertInsideLockSvg();
insertInsideEyeSvg();

userNameInput.addEventListener('focus',()=>envelopeSvg.classList.replace('text-cool-gray-600','text-black'));
userNameInput.addEventListener('blur',()=>{
	if(userNameInput.value==='') envelopeSvg.classList.replace('text-black','text-cool-gray-600');
});

passwordInput.addEventListener('focus',()=>{
	lockSvg.classList.replace('text-cool-gray-600','text-black');
	eyeSvg.classList.replace('text-cool-gray-600','text-black');
})
passwordInput.addEventListener('blur',()=>{
	if(passwordInput.value===''){
		lockSvg.classList.replace('text-black','text-cool-gray-600');
		eyeSvg.classList.replace('text-black','text-cool-gray-600');
	}
});

eyeSvg.addEventListener('click',()=>{
	if(!isVisible){
		passwordInput.type='text';
		eyeSvg.innerHTML=` <path
    d="M0.75 7C0.75 7 3 2.5 7 2.5C11 2.5 13.25 7 13.25 7C13.25 7 11 11.5 7 11.5C3 11.5 0.75 7 0.75 7Z"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linejoin="round"/>

  <!-- مردمک -->
  <circle
    cx="7"
    cy="7"
    r="2.2"
    fill="currentColor"/>`
	}else{
		insertInsideEyeSvg();
		passwordInput.type='password';
	}
	isVisible=!isVisible;
})

form.addEventListener('input',()=>{
	signUpBtn.disabled = userNameInput.value === '' || passwordInput.value === ''; // the output is a boolean.  or: ↓
//	if(userNameInput.value==='' || passwordInput.value===''){
//		signUpBtn.disabled=true;
//	}else{
//		signUpBtn.disabled=false;
//	}
});

form.addEventListener('submit',async (event)=>{
	event.preventDefault();
	let userNameInputValue=userNameInput.value;
	let passwordInputValue=passwordInput.value;
	let data={username:userNameInputValue, password:passwordInputValue}
	try{
	  let resBody= await signup(data);
	  console.log(resBody);
	}catch(error){
		signUpErrorHandler(error);
		
	}
})