import { PageController } from "../shared/PageController.js";
import { CreateProductFormController } from "./CreateProductFormController.js";

export class CreateProductPageController extends PageController {
  constructor(bodyElement, pageConfig) {
    super(bodyElement, pageConfig);

    this.bodyElement = bodyElement;

    this.render();
  }

  render() {
    const createProductFormElement =
      document.querySelector("#createProductForm");
    const createProductFormController = new CreateProductFormController(
      createProductFormElement
    );
  }
}
