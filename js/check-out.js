const cartItems = document.querySelector(".check-out");
const subTotal = document.querySelector(".totals");

//cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

export function addToCart(id) {
  //check if product already is in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((products) => products.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

//update cart

function updateCart() {
  renderCartItems();
  renderSubtotal();

  //save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

//calculate subtotal

function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subTotal.innerHTML = `Subtotal (${totalItems} items): ${totalPrice.toFixed(
    2
  )} kr`;
}

//render cart items

function renderCartItems() {
  cart.forEach((item) => {
    cartItems.innerHTML = ""; // clear cart
    cartItems.innerHTML += `
          <div class="product-specific--check-out">
          <img src="${product.image.url}" alt="${product.description}" id="check-out-product-image"
            class="product-image">
          <div class="product-text">
            <p>${product.title}</p>
            <p>${product.price} kr</p>
            <p>Quantity: <i class="fa-solid fa-minus" onclick="changeNumberOfUnits('minus', ${item.id})"></i> ${numberOfUnits} <i class="fa-solid fa-plus" onclick="changeNumberOfUnits('plus', ${item.id})"></i>"></p>
          </div>
          <i class="fa-regular fa-trash-can" onclick="removeItemFromCart(${item.id})"></i>
          <div class="totals"></div>`;
  });
}

//remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

function changeNumberOfUnits(id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits: numberOfUnits,
    };
  });

  updateCart();
}
