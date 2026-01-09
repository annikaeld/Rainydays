// import { addToCart } from "../check-out.js";

export function insertProductImage(product) {
  const productSpecificJacket = document.querySelector(
    ".product-specific--jacket"
  );

  productSpecificJacket.innerHTML = `
        <img src=${product.images[0].src}>
        `;
}

export function insertProductText(product) {
  const productSpecificDetails = document.querySelector(
    ".product-specific__details"
  );

  productSpecificDetails.innerHTML = `<h3>${product.name}</h3>
    <p class="description-header">Description:</p>
    <p class="description-paragraph">
      ${product.description}
    </p>
    <a href="check-out?id=${product.id}" class="cta" onclick="addToCart(${product.id})">Add to cart</a>`;
}
