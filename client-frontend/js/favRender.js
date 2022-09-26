const renderFavorite = () => {
  document.getElementById("app-body").innerHTML = `
      <div class="back-section">
      <img id="more" src="./images/back.svg" />
      <h2>Favorites<h2>
      </div>
      <div class="more-lists" id="favorite-products-list"><div>
      `;
  document.getElementById("favorite-products-list").innerHTML = favoriteCard(
    products.slice(0, 5)
  );

  document.getElementById("more").onclick = () => {
    position = "more";
    moreRender();
  };
  clicked();
};
