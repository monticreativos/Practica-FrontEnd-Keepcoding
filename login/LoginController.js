import { pubSub } from "../shared/PubSub.js";
import { authService } from "../shared/AuthService.js";

export class LoginController {
  constructor(loginFormElement) {
    this.loginFormElement = loginFormElement;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.onAnyInputChange();
    this.onSubmitForm();
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.loginFormElement.querySelectorAll("input")
    );
    const submitButtonElement = this.loginFormElement.querySelector("button");

    inputElements.forEach((input) => {
      input.addEventListener("input", () => {
        const areInputsFilled = inputElements.every((input) => !!input.value);

        if (areInputsFilled) {
          submitButtonElement.removeAttribute("disabled");
        } else {
          submitButtonElement.setAttribute("disabled", "");
        }
      });
    });
  }

  onSubmitForm() {
    this.loginFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const isFormValid = this.loginFormElement.checkValidity();

      if (!isFormValid) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "Existen campos vacíos"
        );
      } else {
        this.loginUser();
      }
    });
  }

  async loginUser() {
    const formData = new FormData(this.loginFormElement);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await authService.loginUser(username, password);
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
