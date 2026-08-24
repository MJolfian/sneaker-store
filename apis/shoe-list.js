// JavaScript Document
import {urls} from './urls';
import {generateHttpClient} from './client.js';

export const getBrandNames = async () => {
	const response = await generateHttpClient().get(urls.sneaker.getShoeBrandNames);
	return response.data;
}