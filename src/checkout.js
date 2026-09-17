// JavaScript checkout.js
import{getAddress, saveAddress} from './address-logic.js';

const addNewAddressBtn = document.getElementById('addNewAddressBtn');
const wrapper = document.getElementById('wrapper');

if(getAddress().length === 0) addNewAddressBtn.classList.remove('hidden');
else{
	addNewAddressBtn.classList.add('hidden');
	const defaultAddress = getAddress().find(item => item.isDefault === true)
	wrapper.innerHTML = `<label data-id='${defaultAddress.id}' class="address-label flex items-center justify-between gap-x-5 p-5 rounded-3xl bg-white cursor-pointer shadow-cart">
        <div class="flex items-center gap-4 min-w-0">
                <svg class='shrink-0' width="52" height="52" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				  <!-- دایره بیرونی -->
				  <circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="0" fill="#292928" opacity='0.1'/>
				  <!-- دایره داخلی (پس‌زمینه مشکی) -->
				  <circle cx="16" cy="16" r="10" fill="currentColor"/>
				  <!-- آیکون لوکیشن -->
				  <path d="M16 9C13.8 9 12 10.8 12 13C12 16.5 16 21 16 21C16 21 20 16.5 20 13C20 10.8 18.2 9 16 9Z" fill="white"/>
				  <circle cx="16" cy="13" r="2" fill="black"/>
				</svg>
            <div class='min-w-0'>
                <div class="flex items-center gap-2">
                    <h3 class="font-semibold">${defaultAddress.title}</h3>
					${defaultAddress.isDefault ? `<span class="text-xs bg-gray-100 px-2 py-1 rounded-full">Default</span>` : ''}
                </div>
                <p class="text-sm text-gray-500 truncate">${defaultAddress.total}</p>
            </div>
        </div>
		<input type="radio" name="address" value='${defaultAddress.id}' ${defaultAddress.isDefault ? 'checked' : ''} class="size-4 accent-radio cursor-pointer">
    </label>`;
}

addNewAddressBtn.addEventListener('click', () => location.href = '/address?add=true');
wrapper.addEventListener('click', () => location.href = '/address');