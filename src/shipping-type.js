// JavaScript shipping-type.js
import{shippingType} from './shipping-type-logic.js';

const wrappwer = document.getElementById('wrapper');
const applyBtn = document.getElementById('applyBtn');

shippingType.forEach(item => {
	wrappwer.insertAdjacentHTML('beforeend', `<label class="address-label flex items-center justify-between gap-x-5 p-5 rounded-3xl bg-white cursor-pointer shadow-cart">
        <div class="flex items-center gap-4 min-w-0">
                ${item.img}
            <div class='min-w-0'>
                <div class="flex items-center gap-2">
                    <h3 class="name-h3 font-semibold">${item.name}</h3>
                </div>
                <p class="text-sm text-gray-500 truncate">${item.estimate}</p>
            </div>
        </div>
		<input type="radio" name="address" value='${item.name}' class="size-4 accent-radio cursor-pointer">
    </label>`)
})

wrappwer.addEventListener('click', (event) => {
	const label = event.target.closest('.address-label');
	if(!label) return;
	const name = label.querySelector('.name-h3').innerText;

	localStorage.setItem('shippingType', name);
})
////or: with change event
//wrapper.addEventListener('change', event => {
//    if (event.target.type !== 'radio') return;
//
//    const selectedName = event.target.value;
//
//    shippingType.forEach(item => {
//        item.isChecked = item.name === selectedName;
//    });
//});

applyBtn.addEventListener('click', () => location.href = '/checkout');