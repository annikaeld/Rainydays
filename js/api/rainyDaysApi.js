import { displayError } from "../ui/displayError.js";

export function getIdQueryParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  return idParam;
}

export async function productFromApi(id, errorContainer) {
  const apiUrl = `https://rainydays-api.annikaeldoy.no/wp-json/wc/v3/products/${id}`;
  const consumerKey = "ck_aee921e5ee410206f5de6b254d4638cfb2154b77";
  const consumerSecret = "cs_7182e2d71bebc8b0454b2f8a18ae5c6ca622c67f";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(consumerKey + ":" + consumerSecret),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonResponse = await response.json();
    let product = jsonResponse;
    return product;
  } catch (error) {
    const productSpecificDetails = document.querySelector(errorContainer);
    productSpecificDetails.innerHTML = displayError(
      "An error occurred when calling the API"
    );
    console.log("An error occurred when calling the API", error);
  }
}

export async function fetchProducts() {
  const apiUrl =
    "https://rainydays-api.annikaeldoy.no/wp-json/wc/v3/products?per_page=100";
  const consumerKey = "ck_aee921e5ee410206f5de6b254d4638cfb2154b77";
  const consumerSecret = "cs_7182e2d71bebc8b0454b2f8a18ae5c6ca622c67f";

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(consumerKey + ":" + consumerSecret),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const productList = document.querySelector(".product-list");
    const errorMessage = displayError(
      "An error occurred when calling the API: " + error.message
    );
    productList.innerHTML = errorMessage;
    return [];
  }
}
