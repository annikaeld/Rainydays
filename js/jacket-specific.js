function insertProductImage(color) {
  const productSpecificJacket = document.querySelector(
    ".product-specific--jacket"
  );
  console.log("productSpecificJacket: " + productSpecificJacket);

  productSpecificJacket.innerHTML = `
      <img src="images/jacketes/jacket-${color}.jpg" alt="${color} Jacket" class="product-image">
      `;
  console.log("innerHTML is now:" + productSpecificJacket.innerHTML);
}

insertProductImage("dusty-rose");
console.log(product.id);
