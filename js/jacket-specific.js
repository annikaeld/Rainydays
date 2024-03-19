function insertProductImage(color) {
  const productSpecificJacket = document.querySelector(
    ".product-specific--jacket"
  );
  console.log("productSpecificJacket: " + productSpecificJacket);

  productSpecificJacket.innerHTML = `
      <img src=${product.image.url}>
      `;
  console.log("innerHTML is now:" + productSpecificJacket.innerHTML);
}

function insertProductText(text) {
  const productSpecificDetails = document.querySelector(
    ".product-specific__details"
  );
  console.log("productSpecificDetails: " + productSpecificDetails);

  productSpecificDetails.innerHTML = `<h3>${product.title}</h3>
  <p class="description-header">Description:</p>
  <p class="description-paragraph">
    ${product.description}
  </p>
  <a href="check-out.html" class="cta">Add to cart</a>`;
  console.log("innerHTML is now:" + productSpecificDetails.innerHTML);
}

function getIdQueryParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");
  console.log(idParam);
  return idParam;
}

async function productFromApi(id) {
  let url = `https://v2.api.noroff.dev/rainy-days/${id}`;
  const response = await fetch(url);
  const jsonResponse = await response.json();
  let product = jsonResponse.data;
  console.log(product);
  return product;
}

const id = getIdQueryParameter();
const product = await productFromApi(id);
console.log(product);
insertProductImage();
insertProductText();
