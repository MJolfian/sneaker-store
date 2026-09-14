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

export function getCartTotalPrice() {
    return cart.reduce((total, item) => total + item.price * item.quantity,0);
}

export function increaseQuantity(pid) {
    const item = cart.find(item => item.pid === pid);
	console.log(item)
    if (!item) return;

    item.quantity++;
    saveCart();
}

export function decreaseQuantity(pid) {
    const item = cart.find(item => item.pid === pid);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    }

    saveCart();
}

export function removeFromCart(pid) {
    cart = cart.filter(item => item.pid !== pid);

    saveCart();
}