// JavaScript address.js
import{getAddress, saveAddress} from './address-logic.js';
import {showToast} from './show-toast.js';
import {errorHandler, clearErrors} from './address-error-handler.js';

const wrapper = document.getElementById('wrapper');
const addNewAddressBtn = document.getElementById('addNewAddressBtn');
const newAddressSection = document.getElementById('newAddressSection');
const newAddressForm = document.getElementById('new-address-form');
export const titleInputOfNewAddressModal = document.getElementById('title');
export const totalAddressInputOfNewAddressModal = document.getElementById('description');
export const pTagOfTotalAddressErrorOfNewAddressModal = document.getElementById('description-err');
export const pTagOfTitleAddressErrorOfNewAddressModal = document.getElementById('title-err');
const dialogCloseBtn = document.getElementById('dialog-close-btn');

const renderAddresses = () => {
	wrapper.innerHTML = '';
	const address = getAddress();
	address.forEach(item => {
		wrapper.insertAdjacentHTML('beforeend', `<label class="flex items-center justify-between p-5 rounded-3xl bg-white cursor-pointer shadow-cart">
        <div class="flex items-center gap-4">
                <svg width="52" height="52" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				  <!-- دایره بیرونی -->
				  <circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="0" fill="#292928" opacity='0.1'/>
				  <!-- دایره داخلی (پس‌زمینه مشکی) -->
				  <circle cx="16" cy="16" r="10" fill="currentColor"/>
				  <!-- آیکون لوکیشن -->
				  <path d="M16 9C13.8 9 12 10.8 12 13C12 16.5 16 21 16 21C16 21 20 16.5 20 13C20 10.8 18.2 9 16 9Z" fill="white"/>
				  <circle cx="16" cy="13" r="2" fill="black"/>
				</svg>
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold">${item.title}</h3>
					${item.isDefault ? `<span class="text-xs bg-gray-100 px-2 py-1 rounded-full">Default</span>` : ''}
                </div>
                <p class="text-sm text-gray-500">${item.total}</p>
            </div>
        </div>
		<input type="radio" name="address" value='${item.id}' ${item.isDefault ? 'checked' : ''} class="size-4 accent-radio cursor-pointer">
    </label>`)
	})
}
renderAddresses();

addNewAddressBtn.addEventListener('click', () => {
	newAddressSection.classList.remove('hidden');
})
newAddressForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const err = errorHandler(titleInputOfNewAddressModal.value, totalAddressInputOfNewAddressModal.value, pTagOfTitleAddressErrorOfNewAddressModal, pTagOfTotalAddressErrorOfNewAddressModal);
	if(!err){
		showToast('Address added successfully', 'success')
		const address = getAddress();
		const newId = address.length > 0  ? address[address.length - 1].id + 1 : 1;
		const newAddress = {id: newId,
						title: titleInputOfNewAddressModal.value,
						total: totalAddressInputOfNewAddressModal.value,
						isDefault: address.length === 0   // if there wasnt any address, first one isdefault become true
					   }
		address.push(newAddress);
		saveAddress();
		renderAddresses();
		clearErrors(pTagOfTitleAddressErrorOfNewAddressModal, pTagOfTotalAddressErrorOfNewAddressModal);
		titleInputOfNewAddressModal.value = '';
		totalAddressInputOfNewAddressModal.value = '';
		newAddressSection.classList.add('hidden');
	}
})

dialogCloseBtn.addEventListener('click', () => {
	clearErrors(pTagOfTitleAddressErrorOfNewAddressModal, pTagOfTotalAddressErrorOfNewAddressModal);
	titleInputOfNewAddressModal.value = '';
	totalAddressInputOfNewAddressModal.value = '';
	newAddressSection.classList.add('hidden');
})

wrapper.addEventListener('change', (event) => {
    if (event.target.type !== 'radio') return;

    const selectedId = Number(event.target.value);
    const address = getAddress();

    address.forEach(item => {
        item.isDefault = item.id === selectedId;
    });

    saveAddress();

    renderAddresses();
});
