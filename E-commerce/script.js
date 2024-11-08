
// Cart functionality
function addToCart(productName, price, imageSrc) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if the product is already in the cart to prevent duplicates
  const productExists = cart.some(item => item.name === productName);
  if (!productExists) {
    cart.push({ name: productName, price: price, image: imageSrc });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to the cart.`);
  } else {
    alert(`${productName} is already in the cart.`);
  }
}

// Attach event listeners to each "Add to Cart" button
document.querySelectorAll('.add-to-cart').forEach((button, index) => {
  button.addEventListener('click', () => {
    const product = document.querySelectorAll('.product h3')[index].textContent;
    const price = document.querySelectorAll('.product p')[index].textContent;
    const imageSrc = document.querySelectorAll('.product img')[index].src;
    addToCart(product, price, imageSrc);
  });
});

document.getElementById('search').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const products = document.querySelectorAll('#products .product');

  products.forEach(product => {
    const productName = product.getAttribute('data-name').toLowerCase();
    if (productName.includes(searchTerm)) {
      product.style.display = 'block'; // Show matching product
    } else {
      product.style.display = 'none'; // Hide non-matching product
    }
  });
});

