// JavaScript Document
import {getShoeItem} from '../apis/shoe-list.js';
import {homeErrorHandler} from './home-error-handler.js';

const addToCartSvg = document.getElementById('add-to-cart-icon');
const backIcon = document.getElementById('back-icon');
const productImg = document.getElementById('product-img');
const productName = document.getElementById('product-name');
const productPrice = document.getElementById('product-price');

addToCartSvg.innerHTML = `<path d="M7 8.2C6.2 8.5 5.7 9.2 5.6 10.1L4.7 17.8C4.5 19.5 5.8 20.8 7.5 20.8H16.5C18.2 20.8 19.5 19.5 19.3 17.8L18.4 10.1C18.3 9.2 17.8 8.5 17 8.2C15.7 7.7 14.3 7.5 12 7.5C9.7 7.5 8.3 7.7 7 8.2Z"
    			fill="currentColor"/>
				<path d="M8.5 8C8.5 5.5 9.7 3.8 12 3.8C14.3 3.8 15.5 5.5 15.5 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
				<circle cx="9.5" cy="12" r="0.9" fill="black"/>
  				<circle cx="14.5" cy="12" r="0.9" fill="black"/>`;

backIcon.addEventListener('click', () => history.back());

const params = new URLSearchParams(location.search);
const pid = params.get('pid');

async function getShoe(pid){
	try{
		const res = await getShoeItem(pid);
		showProduct(res);
		console.log(res)
	}catch(error){
		homeErrorHandler(error);
	}
	
}
getShoe(pid);

const showProduct = ({imageURL, name, price}) => {
	productImg.src = imageURL;
	productName.innerText = name;
	productPrice.append(price);
}
