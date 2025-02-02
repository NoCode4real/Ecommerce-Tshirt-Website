let cart = [];

function addToCart(itemName) {
    cart.push(itemName);
    updateCart();
    console.log("Cart items:", cart);
    alert(itemName + " added to a cart!");
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    console.log("Cart items:", cart);
}

function updateCart() {
    const cartItemsElement = document.getElementById("cartItems");
    cartItemsElement.innerHTML = ""; // Clear existing items

    if (cart.length === 0) {
        cartItemsElement.innerHTML = "<p>Cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            cartItemsElement.innerHTML += `
                        <div class="flex justify-between items-center border-b py-2">
                            <p>${item}</p>
                            <button styel="background-color:black; color:white;"class="btn-remove text-red-600" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    `;
        });
    }

    // Update cart modal
    const cartItemsModalElement = document.getElementById("cartItemsModal");
    cartItemsModalElement.innerHTML = cartItemsElement.innerHTML;
}

// Update cart button text based on cart items
const cartBtn = document.getElementById('cartBtn');
cartBtn.addEventListener('click', () => {
    cartBtn.innerHTML = `Cart (${cart.length})`;
});

// Initial update
updateCart();