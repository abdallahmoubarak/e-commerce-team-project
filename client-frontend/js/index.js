const imgArray = [
  {
    id: 1,
    seller_id: 1,
    image:
      "https://www.ishtari.com/image/data/system_banner/10000/400/376/backpack-web.png",
  },
  {
    id: 2,
    seller_id: 2,
    image:
      "https://www.ishtari.com/image/data/system_banner/10000/400/376/grillsweb2-copy.png",
  },
  {
    id: 3,
    seller_id: 3,
    image:
      "https://www.ishtari.com/image/data/system_banner/10000/400/376/eiffel-chairs.png",
  },
  {
    id: 4,
    seller_id: 4,
    image:
      "https://www.ishtari.com/image/data/system_banner/10000/400/376/tablet-web-.png",
  },
  {
    id: 5,
    seller_id: 5,
    image:
      "https://www.ishtari.com/image/data/system_banner/10000/400/376/office-chair.png",
  },
];

let curIndex = 0;
let imgDuration = 2000;
let productss;

function slideShow() {
  document.getElementById("image1").src = imgArray[curIndex].image;
  curIndex++;
  if (curIndex == imgArray.length) {
    curIndex = 0;
  }
  setTimeout("slideShow()", imgDuration);
}

const homeRender = () => {
  document.getElementById("app-body").innerHTML = `
    <!-- Start slideshow section -->
    <section class="slideshow" >
      <img class="image" id="image1" />
    </section>
    <!-- End slideshow section -->
    <!-- start ads section -->
    <section class="products" id="products-list"></section>
    <!-- end ads section -->`;
  slideShow();
  let products;
  axios
    .get(
      "http://localhost/e-commerce-team-project/server/api/products/get_all_products.php"
    )
    .then((res) => {
      products = res.data;
      productss = products;
      document.getElementById("products-list").innerHTML =
        productCard(products);
    });
  const cardClick = document.querySelectorAll(".clicked");
  cardClick.forEach((element) => {
    element.onclick = () => {
      renderProduct(element.id);
    };
  });
};

const sellerCard = (sellers) => {
  var sellersList = "";
  sellers.map(
    (seller, i) =>
      (sellersList += `<div class="user-card">
        <div class="user-card-img-name">
          <div class="user-card-img-container">
            <img width="100%" src="${seller.profile_img}" alt="" />
          </div>
          <p class="user-card-name">${seller.name}</p>
        </div>
        <p href=""  class="user-card-edit" id='seller-${seller.id}'>more</p>
      </div>
     `)
  );
  return sellersList;
};
let sellers;
const sellerRender = () => {
  document.getElementById("app-body").innerHTML = ` <div class="search">
  <input
          class="input search-input"
          type="text"
          name=""
          id=""
          placeholder="Search Sellers"
        />
    <button class="button search-btn">Search</button></div>
  <section class="sellers" id="sellers-list"></section>`;
  axios
    .post("http://localhost/e-commerce-team-project/server/api/sellers/all.php")
    .then((res) => {
      sellers = res.data;
      document.getElementById("sellers-list").innerHTML = sellerCard(sellers);
      sellers.map(
        (seller) =>
          (document.getElementById(`seller-${seller.id}`).onclick = () => {
            storeProduct(seller.id);
          })
      );
    });
};

const searchRender = () => {
  document.getElementById("app-body").innerHTML = `
    <div class="search">
    <input
            class="input search-input"
            type="text"
            name=""
            id=""
            placeholder="Search Sellers"
          />
      <button class="button search-btn">Search</button></div>
    <!-- start ads section -->
    <section class="products" id="products-list"></section>
    <!-- end ads section -->`;
  document.getElementById("products-list").innerHTML = productCard(productss);

  const cardClick = document.querySelectorAll(".clicked");
  cardClick.forEach((element) => {
    element.onclick = () => {
      renderProduct(element.id);
    };
  });
};
const cartRender = () => {
  document.getElementById("app-body").innerHTML = `
<h1>Your Cart<h1>
<div class= "cart-content">

    <section class="products" id="checkout-list"></section>
    <section class="checkout-section" id ="checkout"></section>
    <div>`;
  axios
    .get(
      "http://localhost/e-commerce-team-project/server/api/orders/get_user_order.php"
    )
    .then((res) => {
      products = res.data;
      document.getElementById("checkout-list").innerHTML = checkoutCard(
        productss.slice(0, 4)
      );
    });

  document.getElementById("checkout").innerHTML = checkout();
  const cardClick = document.querySelectorAll(".clicked");
  cardClick.forEach((element) => {
    element.onclick = () => {
      renderProduct(element.id);
    };
  });
};
const moreRender = () => {
  document.getElementById("app-body").innerHTML = `
<div class="top-section">
<h1>Favorite Items</h1>
<button class="button" id="favorite-page">More</button>
</div>
<div class="more-lists" id="favorite-products-list"><div>
`;

  const wish = document.createElement("section");
  wish.innerHTML = `<div class="top-section">
<h1>Wishlist</h1>
<button class="button" id="wishlist-page">More</button>
</div>
<div class="more-lists" id="wishlist-products-list"><div>
`;
  document.getElementById("app-body").append(wish);

  document.getElementById("favorite-page").onclick = () => {
    position = "favorite";
    renderFavorite();
  };
  document.getElementById("wishlist-page").onclick = () => {
    position = "wishlist";
    renderWishlist();
  };
  const cardClick = document.querySelectorAll(".clicked");
  cardClick.forEach((element) => {
    element.onclick = () => {
      renderProduct(element.id);
    };
  });

  axios
    .get(
      "http://localhost/e-commerce-team-project/server/api/products/get_all_products.php"
    )
    .then((res) => {
      products = res.data;
      productss = products;

      document.getElementById("favorite-products-list").innerHTML =
        favoriteCard(productss.slice(0, 3));

      document.getElementById("wishlist-products-list").innerHTML =
        wishlistCard(productss.slice(0, 3));
    });
};

window.onload = (event) => {
  homeRender();
};
