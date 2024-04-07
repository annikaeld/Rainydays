import { getIdQueryParameter } from "./api/rainyDaysApi.js";
import { productFromApi } from "./api/rainyDaysApi.js";
import { renderCartItems } from "./ui/renderCartItems.js";
import { getExistingCartFromLocalStorage } from "./ui/renderCartItems.js";

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

function addToCart(newItem) {
  let cart = getExistingCartFromLocalStorage();
  if (cart != null) {
    //check if product already is in cart
    if (cart.some((item) => item.id === newItem.id)) {
      changeNumberOfUnits("plus", newItem.id);
    } else {
      cart.push(newItem);
      saveExistingCartToLocalStorage(cart);
    }
    updateCart();
  }
}

function removeItemFromCart(id) {
  let cart = getExistingCartFromLocalStorage();
  cart = cart.filter((item) => item.id !== id);
  saveExistingCartToLocalStorage(cart);
  updateCart();
}
window.removeItemFromCart = removeItemFromCart; //Make this available from onClick (window object)

function renderSubtotal() {
  let cart = getExistingCartFromLocalStorage();
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  const totalSection = document.querySelector(".totals");
  totalSection.innerHTML = `Subtotal (${totalItems} items): ${totalPrice.toFixed(
    2
  )} kr`;
}

function updateCart() {
  renderCartItems();
  renderSubtotal();
}

function changeNumberOfUnits(action, id) {
  let cart = getExistingCartFromLocalStorage();
  cart = cart.map((item) => {
    if (item.id === id) {
      if (action === "minus" && item.numberOfUnits > 1) {
        item.numberOfUnits--;
      } else if (action === "plus") {
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
    const product = await productFromApi(id, ".check-out");
    if (product != undefined) {
      const cartItem = shoppingCartItem(product);
      addToCart(cartItem);
    }
  }
}

function saveExistingCartToLocalStorage(cart) {
  localStorage.setItem("RainyDaysCart", JSON.stringify(cart));
}

await addGivenProductToCart();
updateCart();
