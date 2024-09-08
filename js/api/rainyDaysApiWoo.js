import { displayError } from "../ui/displayError.js";

export function getIdQueryParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  return idParam;
}

export async function productFromApi(id, errorContainer) {
  const apiUrl = `https://aurover.no/rainydays/app/public/wp-json/wc/v3/products/${id}`;
  const consumerKey = "ck_bd67798e0bf1225148dbe5bb134cc0d30674bdac";
  const consumerSecret = "cs_d8ddf0a454a1bcc37cdb5624675fd1b814ea7904";

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
    "https://aurover.no/rainydays/app/public/wp-json/wc/v3/products?per_page=100";
  const consumerKey = "ck_bd67798e0bf1225148dbe5bb134cc0d30674bdac";
  const consumerSecret = "cs_d8ddf0a454a1bcc37cdb5624675fd1b814ea7904";

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
