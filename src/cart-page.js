// JavaScript Document
import {addToCart, saveCart, getCart} from './cart.js';
console.log(getCart())
const checkoutIcon = document.getElementById('check-out');

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
