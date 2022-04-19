import { ProductDetailPageController } from "./ProductDetailPageController.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageConfig = {
    isPrivate: false,
    header: {
      hasSearch: false,
    },
    spinner: true,
    notification: true,
  };

  const productDetailPageController = new ProductDetailPageController(
    document.body,
    pageConfig
  );
});
