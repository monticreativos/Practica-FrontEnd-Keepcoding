import { productService } from "../shared/ProductService.js";
import { pubSub } from "../shared/PubSub.js";
import { buildProductView, buildNotFoundProductsView } from "./productView.js";

export class ProductListController {
  page = 1;
  limit = 10;
  text = null;
  category = null;

  constructor(productListElement) {
    this.productListElement = productListElement;
  }

  async showProducts() {
    try {
      const productList = await productService.getProductList(
        this.page,
        this.limit,
        this.text,
        this.category
      );

      if (productList.length === 0 && this.page === 1) {
        this.productListElement.innerHTML = buildNotFoundProductsView();
      }

      if (productList.length < this.limit) {
        const customEvent = new CustomEvent("no-more-products");

        this.productListElement.dispatchEvent(customEvent);
      }

      for (const product of productList) {
        const productArticleElement = document.createElement("article");
        const productTemplate = buildProductView(product);

        productArticleElement.innerHTML = productTemplate;

        this.productListElement.appendChild(productArticleElement);
      }
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
      this.productListElement.innerHTML = buildNotFoundProductsView();
    }
  }

  loadMoreProducts() {
    this.page += 1;

    this.showProducts();
  }

  searchProductsByText(text) {
    this.text = text;
    this.resetProductList();
    this.showProducts();
  }

  searchProductsByCategory(category) {
    this.category = category;
    this.resetProductList();
    this.showProducts();
  }

  resetProductList() {
    this.page = 1;

    this.productListElement.innerHTML = "";
  }
}
