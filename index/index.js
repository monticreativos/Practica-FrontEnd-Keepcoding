import { IndexPageController } from "./IndexPageController.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageConfig = {
    isPrivate: false,
    header: {
      hasSearch: true,
    },
    spinner: true,
    notification: true,
  };

  const indexPageController = new IndexPageController(
    document.body,
    pageConfig
  );
});
