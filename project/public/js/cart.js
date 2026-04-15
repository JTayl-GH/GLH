document.addEventListener("DOMContentLoaded", () => {
    displayCart();

    document.getElementById('checkout-btn').addEventListener('click', processPurchase);
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('glh_cart')) || [];
    const container = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        totalElement.innerText = "0.00";
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <span><strong>${item.name}</strong> (x${item.quantity})</span>
                <span>£${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
            </div>
        `;
    }).join('');

    totalElement.innerText = total.toFixed(2);
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('glh_cart'));
    cart.splice(index, 1);
    localStorage.setItem('glh_cart', JSON.stringify(cart));
    displayCart();
}

function clearCart() {
    localStorage.removeItem('glh_cart');
    displayCart();
}

async function processPurchase() {
    const cart = JSON.parse(localStorage.getItem('glh_cart')) || [];
    if (cart.length === 0) return alert("Cart is empty!");

    try {
        // loop through cart & send items to api order route
        for (const item of cart) {
            await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: item.id })
            });
        }

        alert("Purchase successful! Items added to your history.");
        clearCart();
        window.location.href = "/dashboard"; // Redirect to see order history
    } catch (error) {
        alert("There was an error processing your order.");
    }
}