//fetch categories

const storeProduct = (id) => {
  const seller = sellers.filter((item) => item.id == id);
  const seller_name = seller[0].name;
  document.getElementById("app-body").innerHTML = `
    <div id="back" class="back-section">
    <img  src="./images/back.svg" />
    <h2>${seller_name}</h2>
    </div>
    <section class="category-product" id="seller-categories">
   </section>`;

  document.getElementById("back").onclick = () => {
    sellerRender();
  };

  let categories;
  let products;
  let param = new URLSearchParams();
  param.append("seller_id", id);
  axios
    .post(
      "http://localhost/e-commerce-team-project/server/api/categories/get_categories.php",
      param
    )
    .then((res) => {
      categories = res.data;
      console.log(categories);

      categories.map((cat) => {
        axios
          .get(
            `http://localhost/e-commerce-team-project/server/api/products/all.php?category_id=${cat.id}`
          )
          .then((res) => {
            products = res.data;
            console.log(products);
            let prs = document.createElement("div");
            prs.innerHTML = `<h2>${cat.name}</h2>
    
            <div class="cat-product" id="${cat.id}">${productCard(
              products
            )}</div>
        `;
            document.getElementById("seller-categories").append(prs);
          });
      });
    });
};
