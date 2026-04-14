async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const container = document.getElementById('product-list');

        if (!container) return; // Safety check

        if (products.length === 0) {
            container.innerHTML = "<p class='no-products'>No products available yet.</p>";
            return;
        }

        // Generate the HTML for each product
        container.innerHTML = products.map(p => `
            <div class="product-card">
                <img src="${p.image_url || '/images/placeholder.jpg'}" alt="${p.name}" class="rounded-image">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <p class="price"><strong>£${p.price.toFixed(2)}</strong></p>
                    <button class="shop-button" onclick="orderProduct(${p.id})">Order Now</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

async function orderProduct(productId) {
    try {
        const res = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId })
        });

        if (res.ok) {
            alert("Order placed! Check your dashboard for history.");
        } else {
            // This happens if the user isn't logged in (auth middleware fails)
            alert("Please log in to place an order.");
            window.location.href = "/login";
        }
    } catch (error) {
        alert("Something went wrong. Error:", error);
    }
}

// as soon as window loads, run function.
window.onload = loadProducts;