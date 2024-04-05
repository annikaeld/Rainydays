import { fetchProducts } from "../api/rainyDaysApi.js";

export async function renderProductList(gender) {
  const productList = document.querySelector(".product-list");
  const data = await fetchProducts(gender);

  if (data != null) {
    productList.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].gender);
      let product = data[i];
      if (product.gender === gender) {
        console.log(product.id);

        productList.innerHTML += `<div class="product">
     <a href="jacket-specific.html?id=${product.id}">
       <img src="${product.image.url}" alt="${product.image.alt}">
       <p>${product.title}</p>
       <p>${product.price} kr</p>
     </a>
   </div>`;
      }
    }
  }
}
