// JavaScript Document
export const baseUrl='http://localhost:3000';
//export const baseUrl='http://192.168.1.107:3000';
export let urls={
	auth:{
		signup:'/auth/signup',
		login:'/auth/login'
	},
	user:{
		info:'/user',
	},
	sneaker:{
		getShoeBrandNames: '/sneaker/brands',
		getShoes: (page = 1, limit = 10, search = '', brand='') => `/sneaker?page=${page}&limit=${limit}&search=${search}&brands=${brand}`,
//		searchShoes: (page , 10, search = '')
	}
}