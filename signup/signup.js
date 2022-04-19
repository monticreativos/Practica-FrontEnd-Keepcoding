import { SignupPageController } from "./SignupPageController.js";

document.addEventListener("DOMContentLoaded", () => {
  const pageConfig = {
    isPrivate: false,
    header: {
      hasSearch: false,
    },
    spinner: true,
    notification: true,
  };

  const signupPageController = new SignupPageController(
    document.body,
    pageConfig
  );
});
