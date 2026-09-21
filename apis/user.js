// JavaScript Document
import {urls} from './urls.js';
import {generateHttpClient} from './client.js';

export async function getUserInfo(){
	const axiosInstance = generateHttpClient();
	const response = await axiosInstance.get(urls.user.info);
	return response.data;
}