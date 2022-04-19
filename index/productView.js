export function buildProductView(product) {
  const type = product.isSell ? "venta" : "compra";

  return `
  <a href="/productDetail.html?id=${product.id}">
    <div class="product">
      <img src="${product.image}" alt="product image">
      <div>
        <span class="title">${product.title}</span>
        <span class="price"> - ${product.price}</span>
      </div>
      <p class="description">${product.description}</p>
      <span class="type ${type}">${type}</span>
    </div>
  </a>
  `;
}

export function buildNotFoundProductsView() {
  return `
    <h1>No hay productos disponibles, inténtalo de nuevo más tarde.<h1>
  `;
}
