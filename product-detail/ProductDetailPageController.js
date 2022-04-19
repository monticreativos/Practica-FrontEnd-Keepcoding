import { authService } from "../shared/AuthService.js";
import { PageController } from "../shared/PageController.js";
import { localStorageService } from "../shared/LocalStorageService.js";
import { decodeJwtToken } from "../utils/decodeJwtToken.js";
import { ProductDetailController } from "./ProductDetailController.js";
import { productService } from "../shared/ProductService.js";
import { pubSub } from "../shared/PubSub.js";

export class ProductDetailPageController extends PageController {
  productDetailController = null;

  constructor(bodyElement, pageConfig) {
    super(bodyElement, pageConfig);

    this.bodyElement = bodyElement;

    this.render();
  }

  async render() {
    const productDetailElement =
      this.bodyElement.querySelector(".product-detail");

    this.productDetailController = new ProductDetailController(
      productDetailElement
    );

    const productId = this.getProductId();

    await this.productDetailController.showProductDetail(productId);

    this.handleDeleteProductButton();
  }

  getProductId() {
    const searchParams = new URLSearchParams(window.location.search);

    const productId = searchParams.get("id");

    return productId;
  }

  handleDeleteProductButton() {
    if (authService.isUserAuthenticated) {
      const jwt = localStorageService.get(localStorageService.KEYS.AUTH_TOKEN);

      if (jwt) {
        const userInfo = decodeJwtToken(jwt);
        const product = this.productDetailController.product;

        if (userInfo.userId === product.user.id) {
          this.addRemoveProductButton();
        }
      }
    }
  }

  addRemoveProductButton() {
    const removeButtonElement = document.createElement("button");
    removeButtonElement.textContent = "Borrar producto";

    removeButtonElement.addEventListener("click", () => {
      const userWantToDelete = window.confirm("¿Quieres borrar el producto?");
      if (userWantToDelete) {
        this.deleteProduct();
      }
    });

    this.bodyElement
      .querySelector(".remove-button-wrapper")
      .appendChild(removeButtonElement);
  }

  async deleteProduct() {
    try {
      await productService.deleteProduct(
        this.productDetailController.product.id
      );

      pubSub.publish(
        pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,
        "Producto borrado correctamente"
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
