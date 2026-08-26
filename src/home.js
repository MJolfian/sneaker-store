// JavaScript Document
import {getUserInfo} from '../apis/user.js';
import {getBrandNames, getShoes} from '../apis/shoe-list.js';
import {tokenName} from '../libs/constants.js';
import {homeErrorHandler} from './home-error-handler.js';

const time = new Date().getHours();
let greeting = document.getElementById('greeting');
let bellSvg = document.getElementById('bell-svg');
let heartSvg = document.getElementById('heart-svg');
let searchSvg = document.getElementById('search-svg');
let searchInput = document.getElementById('search-input');
const wrapperOfBrandNames = document.getElementById('wrapper-of-brand-names');
let lastClickedBrandBtn = document.querySelectorAll('.brands')[0];
const containerOfProductsSection = document.getElementById('container-of-products-section');
const spanOfUserNameShow = document.getElementById('span-of-user-name-show');

const makeBellSvgDefaultState=()=> bellSvg.innerHTML=`<path d="M10.5 22.0688C11.2956 22.0688 12.0587 21.7782 12.6213 21.2608C13.1839 20.7435 13.5 20.0418 13.5 19.3102H7.5C7.5 20.0418 7.81607 20.7435 8.37868 21.2608C8.94129 21.7782 9.70435 22.0688 10.5 22.0688ZM10.5 2.64538L9.3045 2.86745C7.94844 3.12152 6.7295 3.79863 5.85398 4.78417C4.97846 5.76971 4.50015 7.00315 4.5 8.27573C4.5 9.14193 4.299 11.3061 3.8115 13.4371C3.5715 14.495 3.2475 15.5971 2.817 16.5516H18.183C17.7525 15.5971 17.43 14.4964 17.1885 13.4371C16.701 11.3061 16.5 9.14193 16.5 8.27573C16.4995 7.00339 16.021 5.77028 15.1455 4.78502C14.2701 3.79976 13.0513 3.12285 11.6955 2.86883L10.5 2.644V2.64538ZM19.83 16.5516C20.1645 17.1681 20.5515 17.6564 21 17.9309H0C0.4485 17.6564 0.8355 17.1681 1.17 16.5516C2.52 14.0688 3 9.48952 3 8.27573C3 4.9378 5.58 2.15159 9.0075 1.51573C8.98656 1.32394 9.00958 1.13024 9.07505 0.947137C9.14052 0.76403 9.24701 0.595574 9.38763 0.452634C9.52826 0.309694 9.6999 0.195443 9.8915 0.11725C10.0831 0.0390565 10.2904 -0.00134277 10.5 -0.00134277C10.7096 -0.00134277 10.9169 0.0390565 11.1085 0.11725C11.3001 0.195443 11.4717 0.309694 11.6124 0.452634C11.753 0.595574 11.8595 0.76403 11.9249 0.947137C11.9904 1.13024 12.0134 1.32394 11.9925 1.51573C13.6879 1.83283 15.2121 2.67898 16.3069 3.9109C17.4016 5.14282 17.9998 6.68479 18 8.27573C18 9.48952 18.48 14.0688 19.83 16.5516Z" fill="#212529"/>`;

const makeHeartSvgDefaultState=()=> heartSvg.innerHTML=`<path d="M11.9998 4.12207L10.9243 3.01657C8.39984 0.421573 3.77084 1.31707 2.09984 4.57957C1.31534 6.11407 1.13834 8.32957 2.57084 11.1571C3.95084 13.8796 6.82184 17.1406 11.9998 20.6926C17.1778 17.1406 20.0473 13.8796 21.4288 11.1571C22.8613 8.32807 22.6858 6.11407 21.8998 4.57957C20.2288 1.31707 15.5998 0.420073 13.0753 3.01507L11.9998 4.12207ZM11.9998 22.5001C-10.9997 7.30207 4.91834 -4.55993 11.7358 1.71457C11.8258 1.79707 11.9143 1.88257 11.9998 1.97107C12.0845 1.88265 12.1725 1.79759 12.2638 1.71607C19.0798 -4.56293 34.9993 7.30057 11.9998 22.5001Z" fill="#212529"/>`;

const makeSearchSvgDefaultState=()=> searchSvg.innerHTML=`<path d="M11.742 10.3421C12.7103 9.02083 13.144 7.38264 12.9563 5.7553C12.7687 4.12796 11.9735 2.63149 10.7298 1.56528C9.48616 0.499068 7.88579 -0.0582491 6.24888 0.00482408C4.61197 0.0678972 3.05923 0.746709 1.90131 1.90545C0.743395 3.0642 0.0656939 4.61742 0.00379204 6.25438C-0.0581098 7.89134 0.500353 9.49131 1.56745 10.7342C2.63455 11.9771 4.13159 12.7712 5.75906 12.9577C7.38654 13.1442 9.02442 12.7094 10.345 11.7401H10.344C10.374 11.7801 10.406 11.8181 10.442 11.8551L14.292 15.7051C14.4796 15.8928 14.7339 15.9983 14.9992 15.9983C15.2645 15.9984 15.5189 15.8932 15.7065 15.7056C15.8942 15.5181 15.9997 15.2638 15.9997 14.9985C15.9998 14.7332 15.8946 14.4788 15.707 14.2911L11.857 10.4411C11.8213 10.405 11.7828 10.3715 11.742 10.3411V10.3421ZM12 6.49815C12 7.22042 11.8578 7.93562 11.5814 8.60291C11.305 9.2702 10.8999 9.87651 10.3891 10.3872C9.87841 10.898 9.27209 11.3031 8.6048 11.5795C7.93751 11.8559 7.22231 11.9981 6.50004 11.9981C5.77777 11.9981 5.06258 11.8559 4.39528 11.5795C3.72799 11.3031 3.12168 10.898 2.61096 10.3872C2.10023 9.87651 1.69511 9.2702 1.41871 8.60291C1.14231 7.93562 1.00004 7.22042 1.00004 6.49815C1.00004 5.03946 1.57951 3.64051 2.61096 2.60906C3.64241 1.57761 5.04135 0.998147 6.50004 0.998147C7.95873 0.998147 9.35768 1.57761 10.3891 2.60906C11.4206 3.64051 12 5.03946 12 6.49815Z" fill="currentColor"/>
`;



makeBellSvgDefaultState();
makeHeartSvgDefaultState();
makeSearchSvgDefaultState();

if (!localStorage.getItem(tokenName)) location.href = '/login';

switch(true){
	case time >= 0 && time <= 11:
		greeting.prepend('Good Morning');
		break;
	case time > 11 && time <= 16:
		greeting.prepend('Good Afternoon');
		break;
	case time > 16 && time <= 19:
		greeting.prepend('Good Evening');
		break;
	default:
		greeting.prepend('Good Night');
	   };

const showNameOfUser = async () => {
	try{
		const nameOfUser = await getUserInfo();
		spanOfUserNameShow.textContent = `${nameOfUser.username}`;
	}catch(error){
		homeErrorHandler(error);
		console.log(error);
	}
}
showNameOfUser();

const indicateBrandNames = async () => {
	let arrayOfBrands = await getBrandNames();
	arrayOfBrands.forEach(createRibbonOfBrands);
}
indicateBrandNames();

function createRibbonOfBrands(brandName){
	const addedBrand = document.createElement('button');
	addedBrand.textContent = brandName;
	addedBrand.classList = 'brands border-2 border-brand px-5 py-[10px] rounded-[1.56rem] disabled:text-white disabled:bg-brand cursor-pointer bg-white text-brand text-nowrap';
	wrapperOfBrandNames.append(addedBrand);
}

wrapperOfBrandNames.addEventListener('click', async (event) => {
		if (!event.target.classList.contains('brands')) return;
		lastClickedBrandBtn.disabled = false;
		event.target.disabled = true;
		lastClickedBrandBtn = event.target;
		const getBasedOnBrand = await getShoes( 1 , 10, '', event.target.textContent === 'All' ? '' : event.target.textContent);
		console.log(getBasedOnBrand);
		showProducts(getBasedOnBrand.data);
	
	})

function showProducts(products){
	products.forEach(item => {
		const div = document.createElement('div');
		const img = document.createElement('img');
		
	})
}




searchInput.addEventListener('focus', () => {
	searchSvg.classList.replace('text-cool-gray-600','text-black');
})
searchInput.addEventListener('blur',() => {
	if(searchInput.value===''){
		searchSvg.classList.replace('text-black','text-cool-gray-600');
	}
});


