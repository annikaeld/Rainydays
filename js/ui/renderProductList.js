import { fetchProducts } from "../api/rainyDaysApi.js";

export async function renderProductList(gender) {
  const productList = document.querySelector(".product-list");
  const data = await fetchProducts(gender);

  if (data != null) {
    productList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      let product = data[i];
      if (product.categories[0].name === gender) {
        productList.innerHTML += `<div class="product">
     <a href="jacket-specific?id=${product.id}">
       <img src="${product.images[0].src}" alt="${product.images[0].alt}">
       <p>${product.name}</p>
       <p>${product.price} kr</p>
     </a>
   </div>`;
      }
    }
  }
}
