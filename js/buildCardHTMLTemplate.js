function buildCartHTMLTemplate(item, itemTotal) {
    return `
    <div class="cart-item">
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${itemTotal.toFixed(2)} €</div>
        </div>
        <div class="cart-item-controls">
            <button class="quantity-btn" onclick="decreaseQuantity('${item.id}')">-</button>
            <span class="cart-item-quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="increaseQuantity('${item.id}')">+</button>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
        </div>
    </div>
    `;
}
