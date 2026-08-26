// JavaScript Document
import {urls} from './urls';
import {generateHttpClient} from './client.js';

export const getBrandNames = async () => {
	const response = await generateHttpClient().get(urls.sneaker.getShoeBrandNames);
	return response.data;
}

export async function getShoes(page = 1, limit = 10, search = '', brand=''){  // to home.js
	const axiosInstance = generateHttpClient();
	const response = await axiosInstance.get(urls.sneaker.getShoes(page,limit, search, brand));
	return response.data;
}