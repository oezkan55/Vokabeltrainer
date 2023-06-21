export default class FormView {
  messageBox = document.querySelector(".info");
  #containerForm = document.querySelector(".anwendung__form");
  #anwendung = document.querySelector(".anwendung");

  formVokErstellenVisible() {
    this.#containerForm.classList.remove("anwendung__form--rotate");
    this.clearMessage();
    this.formReset();
  }

  formVokTestVisible(p_handlerVokTest) {
    this.#containerForm.classList.add("anwendung__form--rotate");
    p_handlerVokTest();
  }

  renderMessage(p_vokDe) {
    this.messageBox.innerHTML = `${this.getAnwendungMessage(p_vokDe)}`;
  }

  clearMessage() {
    this.messageBox.textContent = "";
  }

  mobileVisibilityForms(p_isVisible) {
    this.#anwendung.style.display = `${p_isVisible ? "flex" : "none"}`;
  }
}
