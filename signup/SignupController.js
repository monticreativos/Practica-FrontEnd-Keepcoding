import { pubSub } from "../shared/PubSub.js";
import { authService } from "../shared/AuthService.js";

export class SignupController {
  constructor(signupFormElement) {
    this.signupFormElement = signupFormElement;

    this.attachEventListeners();
  }

  attachEventListeners() {
    this.onSubmitForm();

    this.onAnyInputChange();
  }

  onSubmitForm() {
    this.signupFormElement.addEventListener("submit", (event) => {
      event.preventDefault();

      const isFormValid = this.signupFormElement.checkValidity();

      const arePasswordsEqual = this.checkIfPasswordsAreEqual();

      if (!arePasswordsEqual) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "las contraseñas no son iguales"
        );
      }

      if (!isFormValid) {
        pubSub.publish(
          pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
          "Existen campos vacíos"
        );
      }

      if (isFormValid && arePasswordsEqual) {
        console.log("formulario válido");
        this.registerUser();
      }
    });
  }

  onAnyInputChange() {
    const inputElements = Array.from(
      this.signupFormElement.querySelectorAll("input")
    );
    const submitButtonElement = this.signupFormElement.querySelector("button");

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

  checkIfPasswordsAreEqual() {
    const passwordElements = this.signupFormElement.querySelectorAll(
      'input[type="password"]'
    );

    return passwordElements[0].value === passwordElements[1].value;
  }

  async registerUser() {
    const formData = new FormData(this.signupFormElement);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const response = await authService.registerUser(username, password);
      pubSub.publish(
        pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,
        "usuario creado correctamente"
      );
      this.loginUser(username, password);
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }

  async loginUser(username, password) {
    try {
      const response = await authService.loginUser(username, password);
      console.log("LOGIN OK");
      window.location.href = "/";
    } catch (error) {
      pubSub.publish(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, error);
    }
  }
}
