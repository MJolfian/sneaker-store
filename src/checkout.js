// JavaScript checkout.js
import{getAddress} from './address-logic.js';
import{getCart} from './cart.js';
import{shippingType} from './shipping-type-logic.js';

const addNewAddressBtn = document.getElementById('addNewAddressBtn');
const wrapper = document.getElementById('wrapper');
const orderWrapper = document.getElementById('order-wrapper');
const chooseShippingType = document.getElementById('choose-shipping-type');
const shippingTypeWrapper = document.getElementById('shipping-type-wrapper');
const amountSpan = document.getElementById('amount-span');
const shippingSpan = document.getElementById('shipping-span');
const totalSpan = document.getElementById('total-span');
const checkOutSvg = document.getElementById('check-out');

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

function renderProductsOfCart(){
//	orderWrapper.innerHTML = '';
	const cart = getCart();
	for(const item of cart){
		const itemTotal = item.quantity * item.price;
		orderWrapper.insertAdjacentHTML('beforeend', `<div data-pid='${item.pid}' class="cart-item flex gap-x-2 p-4 rounded-3xl shadow-cart">
			<div class="basis-35/100 shrink-0">
				<img src="${item.imageURL}" alt="shoe" class="aspect-1/1 rounded-3xl">
			</div>
			<div class="flex flex-col justify-around basis-65/100 min-w-0">
				<div class="flex justify-between">
					<h4 class="font-bold text-[1.125rem]/none tracking-[-4%] text-title truncate">${item.name}</h4>
					<img class='trash-icon cursor-pointer' src="public/trash.svg" alt="trash">
				</div>
				<div class="flex items-center text-sm text-[#434343] gap-x-1">
					<div class="bg-gray-600 size-4 rounded-full"></div>
					<span>Gray | size = 41</span>
				</div>
				<div class="flex justify-between items-center">
					<span class="font-semibold text-lg tracking-[-4%]">$${itemTotal}</span>
					<div class="flex items-center bg-[#f3f3f3] rounded-full aspect-1/1 px-3 py-1">
							<span class='text-title font-medium text-base'>${item.quantity}</span>
					</div>
				</div>
			</div>
		</div>`)
	}
}
renderProductsOfCart();

const selectedName = localStorage.getItem('shippingType');
const selectedShippingType = shippingType.find(item => item.name === selectedName);
if(selectedShippingType){
	chooseShippingType.classList.add('hidden')
	shippingTypeWrapper.innerHTML = `<label class="address-label flex items-center justify-between gap-x-5 p-5 rounded-3xl bg-white cursor-pointer shadow-cart">
        <div class="flex items-center gap-4 min-w-0">
                ${selectedShippingType.img}
            <div class='min-w-0'>
                <div class="flex items-center gap-2">
                    <h3 id='name' class="font-semibold">${selectedShippingType.name}</h3>
                </div>
                <p class="text-sm text-gray-500 truncate">${selectedShippingType.estimate}</p>
            </div>
        </div>
		<input type="radio" name="shippingType" checked class="size-4 accent-radio cursor-pointer">
    </label>`;
}else{
	chooseShippingType.classList.remove('hidden');
//	shippingTypeWrapper.innerHTML = '';
}

chooseShippingType.addEventListener('click', () => location.href = '/shipping-type');
shippingTypeWrapper.addEventListener('click', event => {
	if(!event.target.closest('.address-label')) return;
	location.href = '/shipping-type';
})

const cart = getCart();
const totalPrice = cart.reduce((total,item) => item.price * item.quantity + total,0)
amountSpan.innerText = '$' + totalPrice;
shippingSpan.textContent = '$' + selectedShippingType.price;
totalSpan.textContent = '$' + totalPrice + selectedShippingType.price;

checkOutSvg.innerHTML = `<!-- خط سمت چپ -->
  <path
    d="M3 24H13"
    stroke="white"
    stroke-width="4"
    stroke-linecap="round"
  />

  <!-- دکمه Play -->
  <path
    d="M18 14.5C18 13.35 19.27 12.63 20.27 13.22L38.77 22.72C39.82 23.26 39.82 24.74 38.77 25.28L20.27 34.78C19.27 35.37 18 34.65 18 33.5V14.5Z"
    fill="white"
  />`;