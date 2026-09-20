// JavaScript payment.js
import{getCart, saveCart, clearCart} from './cart.js';

const wrapper = document.getElementById('wrapper');
const continueBtn = document.getElementById('continue');
const back = document.getElementById('back');
const paymentForm = document.getElementById('payment-form');

const paymentMethods = [{
	name: 'My Wallet',
	img: `<i class="fa-solid fa-wallet" style='width:28px; height:28px'></i>`
},
{
	name: 'Paypal',
	img: `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width="30"
    height="30"
>
    <path
        fill="#003087"
        d="M111.9 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5l-74.6 0c-7.6 0-13.1-6.6-12.1-13.9L59.3 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2z"
    />

    <path
        fill="#009CDE"
        d="M357.6 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9l63.5 0c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
    />
</svg>`
},
{
	name: 'Google Pay',
	img: `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="30"
  height="30"
>
  <path
    fill="#4285F4"
    d="M21.35 12.1c0-.71-.06-1.4-.18-2.05H12v3.89h5.24a4.47 4.47 0 0 1-1.94 2.93v2.43h3.13c1.84-1.69 2.92-4.18 2.92-7.2z"
  />
  <path
    fill="#34A853"
    d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.13-2.43c-.87.58-1.98.92-3.32.92-2.55 0-4.71-1.72-5.49-4.04H3.28v2.51A9.75 9.75 0 0 0 12 21.5z"
  />
  <path
    fill="#FBBC05"
    d="M6.51 13.59A5.86 5.86 0 0 1 6.2 12c0-.55.11-1.09.31-1.59V7.9H3.28A9.5 9.5 0 0 0 2.25 12c0 1.48.35 2.88 1.03 4.1l3.23-2.51z"
  />
  <path
    fill="#EA4335"
    d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.44 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.72 5.4l3.23 2.51C7.29 8.09 9.45 6.37 12 6.37z"
  />
</svg>`
},
{
	name: 'Apple Pay',
	img: `<i class="fa-brands fa-apple" style='width:30px; height:30px'></i>`
}]

paymentMethods.forEach(item => {
	wrapper.insertAdjacentHTML('beforeend', `<label class="address-label flex items-center justify-between gap-x-5 h-19 pl-6 pr-5 rounded-3xl bg-white cursor-pointer shadow-cart">
        <div class="flex items-center gap-4 min-w-0">
                ${item.img}
            <div class='min-w-0'>
                <div class="flex items-center gap-2">
                    <h3 class="name-h3 font-semibold">${item.name}</h3>
                </div>
            </div>
        </div>
		<input required type="radio" name="payment" value='${item.name}' class="size-4 accent-radio cursor-pointer">
    </label>`)
})

//continueBtn.addEventListener('click', () => location.href = '/successful-pay');
paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    location.href = '/successful-pay';
});

back.addEventListener('click', () => history.back());