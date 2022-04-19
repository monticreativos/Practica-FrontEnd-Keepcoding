import { productService } from "../shared/ProductService.js";
import { pubSub } from "../shared/PubSub.js";
import { buildProductDetailView } from "./productDetailView.js";

export class ProductDetailController {
  product = null;

  constructor(productDetailElement) {
    this.productDetailElement = productDetailElement;
  }

  async showProductDetail(productId = null) {
    if (!productId) {
      this.handleNotFoundProduct();
      return;
    }

    try {
      this.product = await productService.getProductById(productId);

      const productArticleElement = document.createElement("article");
      const productTemplate = buildProductDetailView(this.product);

      productArticleElement.innerHTML = productTemplate;

      this.productDetailElement.appendChild(productArticleElement);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  }

  handleNotFoundProduct() {
    pubSub.publish(
      pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
      "Producto no encontrado"
    );

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }
}
