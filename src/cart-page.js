// JavaScript Document
import {getCart, getCartTotalPrice, increaseQuantity, decreaseQuantity, removeFromCart} from './cart.js';
import {showToast} from './show-toast.js';

const checkoutIcon = document.getElementById('check-out');
const totalPriceOfCart = document.getElementById('totalPriceOfCart');
const containerOfCartItems = document.getElementById('main');
const deleteModal = document.getElementById('delete-modal');
const parentDivInDeleteModal = document.getElementById('parentDivInDeleteModal');
const cancelBtnInDeleteModal = document.getElementById('cancelBtnInDeleteModal');
const yesRemoveBtnInDeleteModal = document.getElementById('yesRemoveBtnInDeleteModal');
const whitePartOfDeleteModal = document.getElementById('whitePartOfDeleteModal');

checkoutIcon.innerHTML = `<!-- خط سمت چپ -->
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

function renderCart(){
	containerOfCartItems.innerHTML = '';
	const cart = getCart();
	for(const item of cart){
		const itemTotal = item.quantity * item.price;
		containerOfCartItems.insertAdjacentHTML('beforeend', `<div data-pid='${item.pid}' class="cart-item flex gap-x-2 p-4 rounded-3xl shadow-cart">
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
					<div class="flex items-center bg-[#f3f3f3] rounded-full px-5 py-2">
						<button class='minus-btn cursor-pointer text-title font-medium text-base'>–</button>
							<span class='text-title font-medium text-base px-6'>${item.quantity}</span>
						<button class='plus-btn cursor-pointer text-title font-medium text-base'>+</button>
					</div>
				</div>
			</div>
		</div>`)
	}
	totalPriceOfCart.textContent = '$' + getCartTotalPrice();
}
renderCart();


containerOfCartItems.addEventListener('click', (event) => {
	const cartItem = event.target.closest('.cart-item');
	const plusBtn = event.target.closest('.plus-btn');
	const minusBtn = event.target.closest('.minus-btn');
	const trashIcon = event.target.closest('.trash-icon');
	const pid = Number(cartItem.dataset.pid);
	console.log(plusBtn,minusBtn,trashIcon,pid);
	if(!minusBtn && !plusBtn && !trashIcon) return;
	if(plusBtn){
		increaseQuantity(pid);
		renderCart();
	} 
	else if(minusBtn){
		const item = getCart().find(item => item.pid === pid);
		if(item.quantity === 1) renderDeleteModal(pid);
		decreaseQuantity(pid);
		renderCart();
	} 
	else if(trashIcon){
		renderDeleteModal(pid);
	}
})

let pidToRemove = null;

const renderDeleteModal = (pid) => {
	deleteModal.classList.remove('hidden');
	pidToRemove = pid;
	const cart = getCart();
	const item = cart.find(item => item.pid === pid);
	if(!item) return;
	const itemTotalPrice = item.quantity * item.price;
	parentDivInDeleteModal.innerHTML = `<div class="flex gap-x-2 p-4 my-6 rounded-3xl shadow-cart">
				<div class="basis-35/100 shrink-0">
					<img src="${item.imageURL}" alt="shoe" class="aspect-square rounded-3xl">
				</div>
				<div class="flex flex-col justify-around basis-65/100 min-w-0">
					<div class="flex justify-between">
						<h4 class="font-bold text-[1.125rem]/none tracking-[-4%] text-title truncate">${item.name}</h4>
					</div>
					<div class="flex items-center text-sm text-[#434343] gap-x-1">
						<div class="bg-gray-600 size-4 rounded-full"></div>
						<span>Gray | size = 41</span>
					</div>
					<div class="flex justify-between items-center">
						<span class="font-semibold text-lg tracking-[-4%]">$${itemTotalPrice}</span>
						<div class="flex items-center bg-[#f3f3f3] rounded-full px-5 py-2">
							<button class='cursor-pointer text-title font-medium text-base'>–</button>
							<span class='text-title font-medium text-base px-6'>${item.quantity}</span>
							<button class='cursor-pointer text-title font-medium text-base'>+</button>
						</div>
					</div>
				</div>
			</div>`
}

yesRemoveBtnInDeleteModal.addEventListener('click', () => {
		removeFromCart(pidToRemove);
		showToast('Product removed from cart successfully', 'success');
		deleteModal.classList.add('hidden');
		renderCart();
	})
	cancelBtnInDeleteModal.addEventListener('click', () => {
		deleteModal.classList.add('hidden');
	})

deleteModal.addEventListener('click', (event) => {
	if(!whitePartOfDeleteModal.contains(event.target)) deleteModal.classList.add('hidden');
})