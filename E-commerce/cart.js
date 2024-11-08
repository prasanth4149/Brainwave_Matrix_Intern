// Load cart items from localStorage and display them on the page
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const emptyCartMessage = document.getElementById('empty-cart');

  // Retrieve cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Clear previous cart items display to avoid duplication
  cartItemsContainer.innerHTML = '';

  // Display cart items
  if (cart.length > 0) {
    emptyCartMessage.style.display = 'none';
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('product');

      // Replicate the product card structure
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="remove-from-cart">Remove</button>
        <button class="buy-now">Buy</button>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    // Attach event listeners to remove and buy buttons
    document.querySelectorAll('.remove-from-cart').forEach((button, index) => {
      button.addEventListener('click', () => removeFromCart(index));
    });
    document.querySelectorAll('.buy-now').forEach((button, index) => {
      button.addEventListener('click', () => buyNow(index));
    });
  } else {
    emptyCartMessage.style.display = 'block';
  }
}

// Remove item from cart and update the display
// Remove item from cart with confirmation and update the display
function removeFromCart(index) {
  // Show confirmation prompt
  const confirmation = confirm("Are you sure you want to remove this item from the cart?");
  
  // Proceed with removal if the user confirms
  if (confirmation) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1); // Remove item by index
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCartItems(); // Refresh cart display
  }
}

// Buy item from cart and remove it after purchase
function buyNow(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const item = cart[index];
  alert(`Thank you for purchasing ${item.name} for ${item.price}!`);

  // Remove the item from the cart after purchase
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems(); // Refresh cart display to remove the item
}

// Run displayCartItems function on page load
window.addEventListener('load', displayCartItems);