// cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(product) {
    const existingItem = cart.find(item =>
        item.id === product.id /*&& item.size === selectedSize && item.color === selectedColor*/
	);
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }
    saveCart();
}

export function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const getCart = () => cart;