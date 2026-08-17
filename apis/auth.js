// JavaScript Document
import axios from 'axios';
import {baseUrl, urls} from './urls';
import {generateHttpClient} from './client';

export async function signup(body){
	const response= await generateHttpClient().post(urls.auth.signup,body);
	return response.data;
}