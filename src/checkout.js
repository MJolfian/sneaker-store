// JavaScript checkout.js
import{getAddress, saveAddress} from './address-logic.js';

const addNewAddressBtn = document.getElementById('addNewAddressBtn');

if(getAddress().length === 0) addNewAddressBtn.classList.remove('hidden');
else addNewAddressBtn.classList.add('hidden');

addNewAddressBtn.addEventListener('click', () => location.href = '/address')