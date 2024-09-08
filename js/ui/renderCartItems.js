export function renderCartItems() {
  let cart = getExistingCartFromLocalStorage();
  const cartItems = document.querySelector(".product-specific--check-out");
  cartItems.innerHTML = ""; // clear cart
  cart.forEach((item) => {
    console.log("item", item);
    cartItems.innerHTML += `
              <div class="products">
              <img src="${item.imageurl}" alt="${item.description}" id="check-out-product-image"
                class="product-image">
              <div class="product-text">
                <p>${item.title}</p>
                <p>${item.price} kr</p>
                <p>Quantity:</p>
                <p><i class="fa-solid fa-minus" onclick="changeNumberOfUnits('minus', '${item.id}')"></i> 
                ${item.numberOfUnits} 
                <i class="fa-solid fa-plus" onclick="changeNumberOfUnits('plus', '${item.id}')"></i></p>
              </div>
              <i class="fa-regular fa-trash-can" onclick="removeItemFromCart('${item.id}')"></i>
              </div>`;
  });
}

export function getExistingCartFromLocalStorage() {
  const cart = localStorage.getItem("RainyDaysCart");
  if (cart === undefined) {
  }
  if (cart === null) {
    return [];
  } else if (cart != undefined) {
    return JSON.parse(cart);
  }
}
