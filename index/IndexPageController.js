import { PageController } from "../shared/PageController.js";
import { pubSub } from "../shared/PubSub.js";
import { ProductListController } from "./ProductListController.js";

export class IndexPageController extends PageController {
  productListcontroller = null;
  loadMoreProductsButtonElement = null;

  constructor(bodyElement, pageConfig) {
    super(bodyElement, pageConfig);

    this.bodyElement = bodyElement;

    this.render();
    this.subscribeToEvents();
  }

  render() {
    const productListElement = this.bodyElement.querySelector(".product-list");
    this.productListcontroller = new ProductListController(productListElement);

    this.productListcontroller.showProducts();

    productListElement.addEventListener(
      "no-more-products",
      this.disableLoadMoreProductsButton.bind(this)
    );

    this.handleLoadMoreProductsButton();
  }

  handleLoadMoreProductsButton() {
    this.loadMoreProductsButtonElement =
      this.bodyElement.querySelector("#loadMoreProducts");

    this.loadMoreProductsButtonElement.addEventListener(
      "click",
      this.loadMoreProducts.bind(this)
    );
  }

  loadMoreProducts() {
    this.productListcontroller.loadMoreProducts();
  }

  disableLoadMoreProductsButton() {
    this.loadMoreProductsButtonElement.setAttribute("disabled", "");
  }

  enableLoadMoreProductsButton() {
    this.loadMoreProductsButtonElement.removeAttribute("disabled");
  }

  subscribeToEvents() {
    pubSub.subscribe(
      pubSub.TOPICS.SEARCH_PRODUCTS_BY_TEXT,
      this.searchProductByText.bind(this)
    );

    pubSub.subscribe(
      pubSub.TOPICS.SEARCH_PRODUCTS_BY_CATEGORY,
      this.searchProductByCategory.bind(this)
    );
  }

  searchProductByText(text) {
    this.enableLoadMoreProductsButton();
    this.productListcontroller.searchProductsByText(text);
  }

  searchProductByCategory(category) {
    this.enableLoadMoreProductsButton();
    this.productListcontroller.searchProductsByCategory(category);
  }
}
