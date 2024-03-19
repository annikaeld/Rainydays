const url = "https://v2.api.noroff.dev/rainy-days/";

const productList = document.querySelector(".product-list");

async function jacketsWomen() {
  const response = await fetch(url);

  const jsonResponse = await response.json();
  const data = jsonResponse.data;

  productList.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    console.log(data[i].gender);
    let product = data[i];
    if (product.gender === "Female") {
      console.log(product.id);

      productList.innerHTML += `<div class="product">
     <a href="jacket-specific.html?id=${product.id}">
       <img src="${product.image.url}" alt="${product.image.alt}">
       <p>${product.title}</p>
       <p>${product.price}kr</p>
     </a>
   </div>`;
    }
  }
}

await jacketsWomen();
