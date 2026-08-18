// JavaScript Document
import axios from 'axios';
import {baseUrl, urls} from './urls';
import {generateHttpClient} from './client';

export async function signup(body){  // to signup.js
	const response= await generateHttpClient().post(urls.auth.signup,body);
	return response.data;
}

export async function login(body){  // to login.js
	const response= await generateHttpClient().post(urls.auth.login, body);
	return response.data;
}
