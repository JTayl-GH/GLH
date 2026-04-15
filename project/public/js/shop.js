async function loadProducts() {
    const container = document.getElementById('product-list');
    if (!container) return;

    // 1. Define your original sample products
    const sampleProducts = [
        { id: 's1', name: "Organic Carrots", price: 2.50, image_url: "/images/carrot-background.jpg", description: "Fresh from Sunny Farms" },
        { id: 's2', name: "Fresh Farm Eggs", price: 3.00, image_url: "/images/chicken-eggs.jpg", description: "Green Pastures Grade A" },
        { id: 's3', name: "Local Honey", price: 5.50, image_url: "/images/jar-honey.jpg", description: "Pure Busy Bees nectar" }
    ];

    try {
        const response = await fetch('/api/products');
        const dbProducts = await response.json();

        // 2. Combine samples with database products
        // This puts your examples first, then adds the new ones from the database
        const allProducts = [...sampleProducts, ...dbProducts];

        // 3. Render everything at once
        container.innerHTML = allProducts.map(p => `
            <div class="product-card">
                <img src="${p.image_url || '/images/placeholder.jpg'}" alt="${p.name}" class="product-image">
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p>${p.description || 'Local produce'}</p>
                    <p class="price"><strong>£${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}</strong></p>
                    <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');

    } catch (error) {
         console.error("Error loading products:", error);
        }
    }

    function addToCart(id, name, price) {
        // 1. Get existing cart from storage or start empty
        let cart = JSON.parse(localStorage.getItem('glh_cart')) || [];
    
        // 2. Check if item is already in cart
        const existingItem = cart.find(item => item.id === id);
    
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
    
        // 3. Save back to localStorage
        localStorage.setItem('glh_cart', JSON.stringify(cart));
    
        // 4. Feedback to user
        alert(`${name} added to cart!`);
        updateCartCount(); // Optional: update a number in your navbar
    }

// Use ONE event listener to start the process
document.addEventListener("DOMContentLoaded", loadProducts);