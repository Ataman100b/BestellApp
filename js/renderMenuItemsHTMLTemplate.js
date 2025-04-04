function renderMenuItemsHTMLTemplate(item, specialClass)  {
    return `
        <div class="menu-item">
            <div class="item-image ${specialClass}">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
                <div class="item-price-add">
                    <div class="item-price">${item.price.toFixed(2)} €</div>
                    <button class="add-button" onclick="addToCart('${item.id}', '${item.name}', ${item.price})">+</button>
                </div>
            </div>
        </div>
    `;
}