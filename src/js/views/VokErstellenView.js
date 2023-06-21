import FormView from "./FormView.js";
import icons from "url:../../img/icons-sprite.svg";

class VokErstellenView extends FormView {
  #form = document.querySelector(".erstellen-form");
  #btnUebersetz = document.querySelector(".btn--uebersetzer");
  inputEng = document.getElementById("englisch");
  #inputGer = document.getElementById("deutsch");

  addHandlerVokErstellen(p_handlerErstellen) {
    this.#form.addEventListener("submit", e => {
      e.preventDefault();

      // Schutzklausel
      if (
        !(e.submitter.textContent === "Hinzufügen") ||
        this.inputEng.textContent === ""
      )
        return;

      console.log("test");

      const engInput = ["engWord", this.inputEng.value];
      const gerInput = ["gerWord", this.#inputGer.value];

      const vokArr = [engInput, gerInput].map(p_arr => [
        p_arr[0],
        p_arr[1].toLocaleLowerCase().trim(),
      ]);

      p_handlerErstellen(vokArr);

      this.formReset();
    });
  }

  addHandlerGerWordUebersetzen(p_handlerUebersezten) {
    this.#btnUebersetz.addEventListener("click", e => {
      // Schutzklausel
      if (!e.target.closest(".btn--uebersetzer") || this.#inputGer.value === "")
        return;

      this.renderSpinner();

      const inputValue = document.querySelector(".erstellen-form__input").value;
      console.log(inputValue);
      const valueValid = inputValue.trim().toLocaleLowerCase();

      p_handlerUebersezten(valueValid);
    });
  }

  renderSpinner() {
    const markup = `
      <div class="info__spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.messageBox.textContent = "";
    this.messageBox.insertAdjacentHTML("afterbegin", markup);
  }

  renderEngUebersetzung(p_engWord) {
    this.messageBox.textContent = "";
    this.inputEng.textContent = `${p_engWord.toLocaleLowerCase()}`;
  }

  formReset() {
    this.inputEng.textContent = "";
    this.#form.reset();
  }

  getAnwendungMessage() {
    return `<p class="info__message info__message--vok-add">Vokabel hinzugefügt🙂</p>`;
  }

  errorMessage(p_errMessage) {
    this.messageBox.innerHTML = `
    <p class="info__message info__message--error">${p_errMessage}</p>
    `;
  }
}

export default new VokErstellenView();
