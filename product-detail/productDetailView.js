export function buildProductDetailView(product) {
  const type = product.isSell ? "Compra" : "Venta";
  return `
  <div class="product-detail">
    <img src="${product.image}" alt="product image">
    <span class="type">${type}</span>
    <div>
      <span class="title">${product.title}</span>
      <span class="description"> - ${product.price}</span>
    </div>
    <p class="description">${product.description}</p>
    <p class="date">fecha actualización: ${product.updatedAt.toLocaleString()}</p>
  </div>
  `;
}
