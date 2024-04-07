import { getIdQueryParameter } from "./api/rainyDaysApi.js";
import { productFromApi } from "./api/rainyDaysApi.js";

function shoppingCartItem(product) {
  const item = {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    imageurl: product.image.url,
    numberOfUnits: 1,
  };
  return item;
}

function getExistingCartFromLocalStorage() {
  const cart = localStorage.getItem("RainyDaysCart");
  console.log("getExistingCartFromLocalStorage");
  if (cart === undefined) {
    console.log("cart is undefined");
  }
  console.log(cart);
  if (cart === null) {
    return [];
  } else if (cart != undefined) {
    return JSON.parse(cart);
  }
}

function addToCart(newItem) {
  console.log("addToCart");
  let cart = getExistingCartFromLocalStorage();
  console.log("1");
  console.log(cart);
  if (cart != null) {
    //check if product already is in cart
    if (cart.some((item) => item.id === newItem.id)) {
      changeNumberOfUnits("plus", newItem.id);
    } else {
      cart.push(newItem);
      saveExistingCartToLocalStorage(cart);
    }
    console.log("2");
    console.log(cart);
    console.log("3");
    updateCart();
  }
  console.log(cart);
  console.log("addToCart finish");
}

function removeItemFromCart(id) {
  console.log("removeItemFromCart");
  let cart = getExistingCartFromLocalStorage();
  cart = cart.filter((item) => item.id !== id);
  saveExistingCartToLocalStorage(cart);
  updateCart();
}
window.removeItemFromCart = removeItemFromCart; //Make this available from onClick (window object)

function updateCart() {
  renderCartItems();
}
function changeNumberOfUnits(action, id) {
  console.log("ChangeNumberOfUnits " + action + id);
  let cart = getExistingCartFromLocalStorage();
  console.log(cart);
  cart = cart.map((item) => {
    if (item.id === id) {
      if (action === "minus" && item.numberOfUnits > 1) {
        console.log("minus");
        item.numberOfUnits--;
        if (item.numberOfUnits === 0) {
          removeItemFromCart(id);
        }
      } else if (action === "plus") {
        console.log("plus");
        item.numberOfUnits++;
      }
    }
    saveExistingCartToLocalStorage(cart);
  });

  updateCart();
}
window.changeNumberOfUnits = changeNumberOfUnits; //Make this available from onClick (window object)

async function addGivenProductToCart() {
  const id = getIdQueryParameter();
  if (id != null) {
    const product = await productFromApi(id);
    if (product != undefined) {
      const cartItem = shoppingCartItem(product);
      addToCart(cartItem);
    }
  }
}

function renderCartItems() {
  console.log("renderCartItems");
  let cart = getExistingCartFromLocalStorage();
  const cartItems = document.querySelector(".product-specific--check-out");
  cartItems.innerHTML = ""; // clear cart
  cart.forEach((item) => {
    cartItems.innerHTML += `
            <div class="products">
            <img src="${item.imageurl}" alt="${item.description}" id="check-out-product-image"
              class="product-image">
            <div class="product-text">
              <p>${item.title}</p>
              <p>${item.price} kr</p>
              <p>Quantity:
              <i class="fa-solid fa-minus" onclick="changeNumberOfUnits('minus', '${item.id}')"></i> 
              ${item.numberOfUnits} 
              <i class="fa-solid fa-plus" onclick="changeNumberOfUnits('plus', '${item.id}')"></i></p>
            </div>
            <i class="fa-regular fa-trash-can" onclick="removeItemFromCart('${item.id}')"></i>
            </div>`;
  });
  console.log("renderCartItems finish");
}

function saveExistingCartToLocalStorage(cart) {
  console.log("Save cart");
  console.log(JSON.stringify(cart));
  localStorage.setItem("RainyDaysCart", JSON.stringify(cart));
}

await addGivenProductToCart();
renderCartItems();
