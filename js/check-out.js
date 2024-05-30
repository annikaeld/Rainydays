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

const form = document.querySelector("#buy");
console.log("form:" + form);
const email = document.querySelector("#email");
console.log("email:" + email);
const emailError = document.querySelector("#emailError");
const ccn = document.querySelector("#ccn");
const ccnError = document.querySelector("#ccnError");
const mmyy = document.querySelector("#mmyy");
const mmyyError = document.querySelector("#mmyyError");
const cvc = document.querySelector("#cvc");
console.log("cvc:" + cvc);
const cvcError = document.querySelector("#cvcError");

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

function validateForm(event) {
  let isValid = true;

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
    isValid = false;
  }

  if (checkLength(ccn.value, 16) === true) {
    ccnError.style.display = "none";
  } else {
    ccnError.style.display = "block";
    isValid = false;
  }

  if (checkLength(mmyy.value, 4) === true) {
    mmyyError.style.display = "none";
  } else {
    mmyyError.style.display = "block";
    isValid = false;
  }

  if (checkLength(cvc.value, 3) === true) {
    cvcError.style.display = "none";
  } else {
    cvcError.style.display = "block";
    isValid = false;
  }

  // If the form is not valid, prevent it from being submitted
  if (!isValid) {
    event.preventDefault();
  }
}

form.addEventListener("submit", validateForm);