const url = "https://v2.api.noroff.dev/rainy-days/";

const productList = document.querySelector(".product-list");

async function jacketsMen() {
  try {
    const response = await fetch(url);

    const jsonResponse = await response.json();
    const data = jsonResponse.data;

    productList.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
      console.log(data[i].gender);
      let product = data[i];
      if (product.gender === "Male") {
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
  } catch (error) {
    console.log("An error occurred");
    productList.innerHTML = displayError(
      "An error occurred when calling the API"
    );
  }
}

await jacketsMen();
