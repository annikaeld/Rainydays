import { validateEmail } from "./ui/formValidation.js";
import { checkLength } from "./ui/formValidation.js";

const form = document.querySelector("#contact");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

function validateForm(event) {
  let isValid = true;

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
    isValid = false;
  }

  if (checkLength(message.value, 2) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
    isValid = false;
  }

  // If the form is not valid, prevent it from being submitted
  if (!isValid) {
    event.preventDefault();
  }
}

form.addEventListener("submit", validateForm);