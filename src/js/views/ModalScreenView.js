class ModalScreenView {
  #btnFAQ = document.querySelector(".btn--faq");
  #mobileFAQ = document.querySelector(".mobile-nav__list > li:last-child");
  #overlay = document.querySelector(".overlay");
  #modalAccord = document.querySelector(".accordion");
  #accordBtn = document.querySelector(".btn--accordion");

  constructor() {
    this.#addHandlerToggleModalScreen();
    this.#accordItemToggleCloseOpen();
  }

  #toggleModelScreenVisible() {
    this.#accordItemReset();
    this.#modalAccord.classList.toggle("accordion--visible");
    this.#overlay.classList.toggle("overlay--hidden");
  }

  #addHandlerToggleModalScreen() {
    [this.#overlay, this.#accordBtn, this.#btnFAQ, this.#mobileFAQ].forEach(
      p_zielEl => {
        p_zielEl.addEventListener("click", () =>
          this.#toggleModelScreenVisible()
        );
      }
    );
  }

  #accordItemReset() {
    const items = document.querySelectorAll(".accordion__item");
    items.forEach(p_item => p_item.classList.remove("accordion__item--open"));
  }

  #accordItemToggleCloseOpen() {
    this.#modalAccord.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--item");

      // Schutzklausel
      if (!btn) return;

      btn.parentElement.classList.toggle("accordion__item--open");
    });
  }
}

export default new ModalScreenView();
