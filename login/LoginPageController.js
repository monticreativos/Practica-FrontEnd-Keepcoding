import { PageController } from "../shared/PageController.js";
import { LoginController } from "./LoginController.js";

export class LoginPageController extends PageController {
  constructor(bodyElement, pageConfig) {
    super(bodyElement, pageConfig);

    this.bodyElement = bodyElement;

    this.render();
  }

  render() {
    const loginElement = this.bodyElement.querySelector("#loginForm");
    const loginController = new LoginController(loginElement);
  }
}
