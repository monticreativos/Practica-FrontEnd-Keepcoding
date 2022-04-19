import { LoginPageController } from "./LoginPageController.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageConfig = {
    isPrivate: false,
    header: {
      hasSearch: false,
    },
    spinner: true,
    notification: true,
  };

  const loginPageController = new LoginPageController(
    document.body,
    pageConfig
  );
});
