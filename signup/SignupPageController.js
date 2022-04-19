import { PageController } from "../shared/PageController.js";
import { SignupController } from "./SignupController.js";

export class SignupPageController extends PageController {
  constructor(bodyElement, pageConfig) {
    super(bodyElement, pageConfig);

    this.bodyElement = bodyElement;

    this.render();
  }

  render() {
    const signupElement = this.bodyElement.querySelector("#signupForm");
    const signupController = new SignupController(signupElement);
  }
}
