// JavaScript address-logic.js
let address = JSON.parse(localStorage.getItem('address')) || [];

export function addAddress(){
	
}

export const getAddress = () => address;
export const saveAddress = () => localStorage.setItem('address', JSON.stringify(address));