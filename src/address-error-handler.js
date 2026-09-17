// JavaScript \address-error-handler.js
import{getAddress} from './address-logic.js';

export const clearErrors = (titleError, addressError) => {
	titleError.textContent = '';
	titleError.classList.add('hidden');
	addressError.textContent = '';
	addressError.classList.add('hidden');
}

export function errorHandler(titleValue, addressValue, titleError, addressError){
	clearErrors(titleError, addressError);
	const address = getAddress();
	const existingAddress = address.find(item => item.totalAddress === addressValue);
	const existingTitle = address.find(item => item.title === titleValue);
	
	if(titleValue === ''){
		titleError.classList.remove('hidden');
		titleError.innerText = "Title can't be empty.";
		return true;
	}else if(addressValue === ''){
		addressError.classList.remove('hidden');
		addressError.innerText = "Address can't be empty.";
		return true;
	} else if(existingAddress){
		addressError.classList.remove('hidden');
		addressError.textContent = 'This address already exists.';
		return true;
	}else if(existingTitle){
		titleError.classList.remove('hidden');
		titleError.innerText = "Address title already exists.";
		return true;
	}else if(addressValue.length < 10){
		addressError.classList.remove('hidden');
		addressError.textContent = 'Address must be at least 10 characters long.';
		return true;
	}else return false;
}