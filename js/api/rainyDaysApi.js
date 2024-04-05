import { displayError } from "../ui/displayError.js";

export function getIdQueryParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  console.log(idParam);
  return idParam;
}

export async function productFromApi(id) {
  try {
    let url = `https://v2.api.noroff.dev/rainy-days/${id}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    let product = jsonResponse.data;
    console.log(product);
    return product;
  } catch (error) {
    const productSpecificDetails = document.querySelector(
      ".product-specific__details"
    );
    console.log("An error occurred");
    productSpecificDetails.innerHTML = displayError(
      "An error occurred when calling the API"
    );
  }
}

export async function fetchProducts() {
  const url = "https://v2.api.noroff.dev/rainy-days/";
  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const data = jsonResponse.data;
    return data;
  } catch (error) {
    const productList = document.querySelector(".product-list");
    console.log(productList);
    console.log("An error occurred");
    const errorMessage = displayError("An error occured when calling the API");
    console.log(errorMessage);
    productList.innerHTML = errorMessage;
  }
}
