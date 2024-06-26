import { displayError } from "../ui/displayError.js";

export function getIdQueryParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  return idParam;
}

export async function productFromApi(id, errorContainer) {
  try {
    let url = `https://v2.api.noroff.dev/rainy-days/${id}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    let product = jsonResponse.data;
    return product;
  } 
  catch (error) {
    const productSpecificDetails = document.querySelector(
      errorContainer
    );
    productSpecificDetails.innerHTML = displayError(
      "An error occurred when calling the API"
    );
    console.log("An error occurred when calling the API");
  }
}

export async function fetchProducts() {
  const url = "https://v2.api.noroff.dev/rainy-days/";
  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const data = jsonResponse.data;
    return data;
  }
  catch (error) {
    const productList = document.querySelector(".product-list");
    const errorMessage = displayError("An error occured when calling the API");
    productList.innerHTML = errorMessage;
  }
}
