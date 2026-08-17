// JavaScript Document
const slider=document.getElementById('slider');
const onboardingPage=document.getElementById('onboarding-page');
const sliderContainer=document.getElementsByTagName('main')[0];
const secondPage=document.getElementById('page2');
const buttonP3=document.getElementById('btn-p3');
const buttonP4=document.getElementById('btn-p4');
const buttonP5=document.getElementById('btn-p5');
const thirdPage=document.getElementById('page3')
const fourthPage=document.getElementById('page4')
const fifthPage=document.getElementById('page5')

let currentPage=1;

function goToNextPage(){
	slider.style.transform =`translateX(-${currentPage*100}%)`;
	currentPage++;
}

setTimeout(()=>{
	goToNextPage(currentPage);
},3400)

setTimeout(()=>{
	secondPage.addEventListener('click',()=>{
		goToNextPage(currentPage);
		if(currentPage===3) thirdPage.classList.add('short:h-[660px]', 'short:mb-10');
})},5000)

buttonP3.addEventListener('click',()=>{
	goToNextPage(currentPage);
	if(currentPage===4) fourthPage.classList.add('short:h-[660px]', 'short:mb-10');
})

buttonP4.addEventListener('click',()=>{
	goToNextPage(currentPage);
	if(currentPage===5) fifthPage.classList.add('short:h-[660px]', 'short:mb-10');
})

buttonP5.addEventListener('click',()=>{
	goToNextPage(currentPage);
})



let viewportWidth=document.getElementsByClassName('vw')[0];
console.log(viewportWidth)
viewportWidth.textContent=`viewport width:${window.innerWidth}px\nviewport height:${window.innerHeight}px`