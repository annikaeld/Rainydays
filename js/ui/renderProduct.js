// import { addToCart } from "../check-out.js";

export function insertProductImage(product) {
  const productSpecificJacket = document.querySelector(
    ".product-specific--jacket"
  );
  console.log("productSpecificJacket: " + productSpecificJacket);

  productSpecificJacket.innerHTML = `
        <img src=${product.image.url}>
        `;
  console.log("innerHTML is now:" + productSpecificJacket.innerHTML);
}

export function insertProductText(product) {
  const productSpecificDetails = document.querySelector(
    ".product-specific__details"
  );
  console.log("productSpecificDetails: " + productSpecificDetails);

  productSpecificDetails.innerHTML = `<h3>${product.title}</h3>
    <p class="description-header">Description:</p>
    <p class="description-paragraph">
      ${product.description}
    </p>
    <a href="check-out.html?id=${product.id}" class="cta" onclick="addToCart(${product.id})">Add to cart</a>`;
  console.log("innerHTML is now:" + productSpecificDetails.innerHTML);
}
