let productRow = document.querySelector(".product-row");

let baskets = JSON.parse(localStorage.getItem("basket")) || [];

document.addEventListener("DOMContentLoaded", function () {
  fetch('https://fakestoreapi.com/products')
    .then((response) => response.json())
    .then(ShowProducts);
});

function ShowProducts(products){ 
  productRow.innerHTML = "";
  products.forEach((product) => {
    let hasInBasket = baskets.some((basket) => basket.id == product.id);
    productRow.innerHTML += `<div class="col-xl-4">
    <div class="card product">
      <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
      
      <div class="card-body">
        <h5 class="card-title">${getTitle(product.title, 10)}</h5>
        <b class="card-text">
        Price: ${product.price} AZN
        </b>
        <p class="card-text">
        ${getTitle(product.description, 60)}
        </p>

        <button class="btn btn-success">One Click</button>
        <button class='product-shop-btn ${hasInBasket ? "active" : ""}' data-id='${product.id
        }'><i class="fa-solid fa-cart-shopping"></i></button>
      </div>
    </div>
  </div>`;
  });

  AddEventsToBasketBtn();
}

function AddEventsToBasketBtn(){
  let productBaskets = document.getElementsByClassName("product-shop-btn");
  for (const btn of productBaskets) {
    btn.addEventListener("click", function (e) {
      let thisEl = e.currentTarget;
      let id = Number(thisEl.dataset.id);
      
      if(thisEl.classList.contains("active")) {
        baskets = baskets.filter((basket) => basket.id !== id);
      } else {
        baskets.push({
          id: id,
          count: 1
        });
      }

      thisEl.classList.toggle("active");
      localStorage.setItem("basket", JSON.stringify(baskets));
    });
  }
}

function getTitle(title, count) {
  return title.length > count ? title.substring(0, count).concat("...") : title;
}
