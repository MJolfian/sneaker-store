//auth-guard.js
import {tokenName} from '../libs/constants.js';

export function isAuthenticated(){
	if(!localStorage.getItem(tokenName)) location.replace('/login');
}
