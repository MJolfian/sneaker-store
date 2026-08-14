import './style.css'
const slider=document.getElementById('slider');
const onboardingPage=document.getElementById('onboarding-page');
const sliderContainer=document.getElementsByTagName('main')[0];
let secondPage=document.getElementById('p2');

let currentPage=1;

function goToNextPage(pageNumber){
	slider.style.transform =`translateX(-${currentPage*100}%)`;
	currentPage++;
}

setTimeout(()=>{
	goToNextPage(currentPage);
},3000)

setTimeout(()=>{
	secondPage.addEventListener('click',()=>{
		goToNextPage(currentPage);
})},5000)



let viewportWidth=document.getElementsByClassName('vw')[0];
console.log(viewportWidth)
viewportWidth.textContent=`viewport width:${window.innerWidth}px\nviewport height:${window.innerHeight}px`