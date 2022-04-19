import { CreateProductPageController } from "./CreateProductPageController.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageConfig = {
    isPrivate: true,
    header: {
      hasSearch: false,
    },
    spinner: true,
    notification: true,
  };

  const createProductPageController = new CreateProductPageController(
    document.body,
    pageConfig
  );
});
