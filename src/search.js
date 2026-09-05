// JavaScript Document
import {getShoes} from '../apis/shoe-list.js';
import {homeErrorHandler} from './home-error-handler.js';

let searchInput = document.getElementById('search-input');
let searchSvg = document.getElementById('search-svg');
const notFoundImg = document.getElementById('not-found-img');
const paginationHintText = document.getElementById('pagination-hint');
let containerOfProductsSection = document.getElementById('container-of-products-section');


const makeSearchSvgDefaultState = () => searchSvg.innerHTML=`<path d="M11.742 10.3421C12.7103 9.02083 13.144 7.38264 12.9563 5.7553C12.7687 4.12796 11.9735 2.63149 10.7298 1.56528C9.48616 0.499068 7.88579 -0.0582491 6.24888 0.00482408C4.61197 0.0678972 3.05923 0.746709 1.90131 1.90545C0.743395 3.0642 0.0656939 4.61742 0.00379204 6.25438C-0.0581098 7.89134 0.500353 9.49131 1.56745 10.7342C2.63455 11.9771 4.13159 12.7712 5.75906 12.9577C7.38654 13.1442 9.02442 12.7094 10.345 11.7401H10.344C10.374 11.7801 10.406 11.8181 10.442 11.8551L14.292 15.7051C14.4796 15.8928 14.7339 15.9983 14.9992 15.9983C15.2645 15.9984 15.5189 15.8932 15.7065 15.7056C15.8942 15.5181 15.9997 15.2638 15.9997 14.9985C15.9998 14.7332 15.8946 14.4788 15.707 14.2911L11.857 10.4411C11.8213 10.405 11.7828 10.3715 11.742 10.3411V10.3421ZM12 6.49815C12 7.22042 11.8578 7.93562 11.5814 8.60291C11.305 9.2702 10.8999 9.87651 10.3891 10.3872C9.87841 10.898 9.27209 11.3031 8.6048 11.5795C7.93751 11.8559 7.22231 11.9981 6.50004 11.9981C5.77777 11.9981 5.06258 11.8559 4.39528 11.5795C3.72799 11.3031 3.12168 10.898 2.61096 10.3872C2.10023 9.87651 1.69511 9.2702 1.41871 8.60291C1.14231 7.93562 1.00004 7.22042 1.00004 6.49815C1.00004 5.03946 1.57951 3.64051 2.61096 2.60906C3.64241 1.57761 5.04135 0.998147 6.50004 0.998147C7.95873 0.998147 9.35768 1.57761 10.3891 2.60906C11.4206 3.64051 12 5.03946 12 6.49815Z" fill="currentColor"/>
`;
makeSearchSvgDefaultState();

const params = new URLSearchParams(location.search);
let searchValue = params.get('value');
//console.log(searchValueFromHomePage)
searchInput.value = searchValue;

let observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) =>{
		if(entry.isIntersecting && !isLoading) getSneakersBasedOnSearchWords();
	},{threshold:1})
});
observer.observe(paginationHintText);


let timeOut;

searchInput.addEventListener('input', () => {
	clearTimeout(timeOut);
	searchValue = searchInput.value;
	timeOut = setTimeout(() => {
		console.log(searchValue);
		observer?.disconnect();
		page = 1;
		totalPage = 1;
		containerOfProductsSection.querySelectorAll('.product-box').forEach(item => item.remove());
		console.log('searchValue: '+searchValue,'  search his: '+searchHistory);
		saveToSearchHistory();
		getSneakersBasedOnSearchWords();
		observer.observe(paginationHintText);
	}, 500);
})


let isLoading = false;
let page = 1;
let totalPage;

const getSneakersBasedOnSearchWords = async () => {
	if (page > totalPage){
            observer.unobserve(paginationHintText);
            return;
        };
	if(isLoading) return;
	isLoading = true;
	try{
		const res = await getShoes(page, 10, searchValue);
		totalPage = res.totalPages;
		console.log(res);
		showRecievedSneakers(res.data);
		page++;
	}catch(error){
		homeErrorHandler(error);
	}finally{
		isLoading = false;
	}
}


function showRecievedSneakers(shoesArray){
	if(shoesArray.length === 0) return notFoundImg.classList.remove('hidden');
	
		notFoundImg.classList.add('hidden');
	
	shoesArray.forEach(item => {
		const div = document.createElement('div');
		const innerDiv = document.createElement('div');
		const img = document.createElement('img');
		const h3 = document.createElement('h3');
		const p = document.createElement('p');
		img.className = 'rounded-3xl aspect-square';
		img.src = item.imageURL;
		img.alt = item.brand;
		div.classList = 'product-box flex flex-col';
		innerDiv.classList = 'grow flex flex-col justify-around';
		h3.classList = 'font-bold text-[1.125rem]/none tracking-[-4%] text-title mt-3 mb-2 truncate sm:text-wrap sm:line-clamp-2';
		h3.textContent = item.name;
		p.className = 'text-title font-semibold text-base/none';
		p.innerText = '$ ' + item.price;
		containerOfProductsSection.append(div);
		div.append(img, innerDiv);
		innerDiv.append(h3, p);
	});
}

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

function saveToSearchHistory(){
		if(searchValue.trim() === '') return;
    searchHistory = searchHistory.filter(item => item !== searchValue);
    searchHistory.unshift(searchValue);
    searchHistory = searchHistory.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}

let showRecords = (historyArray) => {
		const wrapperDiv = document.createElement('div');
		wrapperDiv.className = 'hisWrapper absolute w-full bg-white pb-2 space-y-5';
		containerOfProductsSection.append(wrapperDiv);
		historyArray.forEach(item => {
		wrapperDiv.insertAdjacentHTML('beforeend', `<div class="flex justify-between items-center">
					<p class="text-greeting text-base font-medium">${item}</p>
					<span class="text-[20px]/none text-[#787878] border-2 border-[#8a8a8a] pt-[1px] pb-1 px-[7px] rounded-[11px] cursor-pointer">×</span>
				</div>`)
	})
		notFoundImg.classList.add('hidden');
	};
		
searchInput.addEventListener('focus', () => {
	searchSvg.classList.replace('text-cool-gray-600','text-black');
//		console.log(JSON.parse(localStorage.getItem('searchHistory')))
	showRecords(searchHistory);
})
searchInput.addEventListener('blur',() => {
	if(searchInput.value === ''){
		searchSvg.classList.replace('text-black','text-cool-gray-600');
	}
		const hisWrapper = containerOfProductsSection.querySelector('.hisWrapper');
		if(hisWrapper) hisWrapper.remove();
});