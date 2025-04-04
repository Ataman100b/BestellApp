let cartItems = [];
const deliveryFee = 2.99;

const appetizersListElement = document.getElementById('appetizers-list');
const mainDishesListElement = document.getElementById('main-dishes-list');
const dessertsListElement = document.getElementById('desserts-list');

window.onload = function() {
    renderMenuItems(menuData.appetizers, appetizersListElement);
    renderMenuItems(menuData.mainDishes, mainDishesListElement);
    renderMenuItems(menuData.desserts, dessertsListElement);
    
    updateCart();
    
    setupBurgerMenu();
};



function renderMenuItems(items, container) {
    let html = '';
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let specialClass = '';
        
        if (item.id === 'd1') specialClass = 'sellou-image';
        if (item.id === 'd2') specialClass = 'tamina-image';
        if (item.id === 'a1') specialClass = 'amlou-image';

        html += renderMenuItemsHTMLTemplate(item, specialClass);
    }
    
    container.innerHTML = html;
}

function addToCart(id, name, price) {
    let found = false;
    
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            cartItems[i].quantity += 1;
            found = true;
            break;
        }
    }
    
    if (!found) {
        cartItems.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
}

function removeFromCart(id) {
    let newCartItems = [];
    
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id !== id) {
            newCartItems.push(cartItems[i]);
        }
    }
    
    cartItems = newCartItems;
    updateCart();
}

function increaseQuantity(id) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            cartItems[i].quantity += 1;
            break;
        }
    }
    updateCart();
}

function decreaseQuantity(id) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === id) {
            if (cartItems[i].quantity > 1) {
                cartItems[i].quantity -= 1;
            } else {
                removeFromCart(id);
                return;
            }
            break;
        }
    }
    updateCart();
}

function calculateCartTotals() {
    let subtotal = 0;
    for (let i = 0; i < cartItems.length; i++) {
        subtotal += cartItems[i].price * cartItems[i].quantity;
    }
    
    const total = subtotal + (subtotal > 0 ? deliveryFee : 0);
    return { 
        subtotal, 
        total,
        subtotalText: subtotal.toFixed(2) + ' €',
        totalText: total.toFixed(2) + ' €'
    };
}

function updatePriceDisplays(subtotalText, totalText) {
    const subtotalDesktop = document.getElementById('subtotal-desktop');
    const subtotalMobile = document.getElementById('subtotal-mobile');
    const totalDesktop = document.getElementById('total-desktop');
    const totalMobile = document.getElementById('total-mobile');
    const mobileCartTotal = document.getElementById('mobile-cart-total');
    
    subtotalDesktop.textContent = subtotalText;
    subtotalMobile.textContent = subtotalText;
    totalDesktop.textContent = totalText;
    totalMobile.textContent = totalText;
    mobileCartTotal.textContent = totalText;
}

function renderCartItems() {
    const cartItemsDesktop = document.getElementById('cart-items-desktop');
    const cartItemsMobile = document.getElementById('cart-items-mobile');
    
    if (cartItems.length === 0) {
        const emptyCartMessage = '<p class="empty-cart">Ihr Warenkorb ist leer</p>';
        cartItemsDesktop.innerHTML = emptyCartMessage;
        cartItemsMobile.innerHTML = emptyCartMessage;
        return;
    }
    
    let cartHTML = '';
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const itemTotal = item.price * item.quantity;
        cartHTML += buildCartHTMLTemplate(item, itemTotal);
    }
    
    cartItemsDesktop.innerHTML = cartHTML;
    cartItemsMobile.innerHTML = cartHTML;
}

function updateCart() {
    const { subtotalText, totalText } = calculateCartTotals();
    updatePriceDisplays(subtotalText, totalText);
    renderCartItems();
}

function openMobileCart() {
    document.getElementById('cart-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeMobileCart() {
    document.getElementById('cart-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function placeOrder() {
    if (cartItems.length === 0) {
        return;
    }
    
    document.getElementById('order-confirmation').style.display = 'flex';
    cartItems = [];
    updateCart();
    closeMobileCart();
}

function closeConfirmation() {
    document.getElementById('order-confirmation').style.display = 'none';
}