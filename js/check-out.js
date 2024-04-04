const productInBasket = document.querySelector(".check-out");

function addToBasket() {
  productInBasket.innerHTML = "";

  productInBasket {
    productInBasket.innerHTML += `<div class="product-specific--check-out">
    <img src="images/jacketes/jacket-white.jpg" alt="White Jacket" id="check-out-product-image"
      class="product-image">
    <div class="product-text">
      <p>Patagonia Torrentshell 3L Jacket</p>
      <p>kr 1598,-</p>
      <p>Quantity: 1</p>
    </div>
    <i class="fa-regular fa-trash-can"></i>`;
};
}

addToBasket();
console.log(addToBasket);
