const cartItems = document.querySelector(".check-out");

//cart array
let cart = [];

function addToCart(id) {
  //check if product already is in cart
  if (cart.some((item) => item.id === id)) {
    alert("product already in cart!");
  } else {
    const item = products.find((products) => products.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart()
}

//update cart

function = updateCart(){
  renderCartItems();
  renderSubtotal();
}

//render cart items

function renderCartItems() {
  cart.forEach((item) => {
     cartItems.innerHTML = "" ; // clear cart
    cartItems.innerHTML += `
          <div class="product-specific--check-out">
          <img src="${product.image.url}" alt="${product.description}" id="check-out-product-image"
            class="product-image">
          <div class="product-text">
            <p>${product.title}</p>
            <p>${product.price} kr</p>
            <p>Quantity: ${numberOfUnits}</p>
          </div>
          <i class="fa-regular fa-trash-can" onclick="removeItem()"></i> `
  });
}

function removeItem(id)


