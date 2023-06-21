class NavView {
  // Mobile Nav
  #mobNav = document.querySelector(".mobile-nav");
  #mobileNavBtn = document.querySelector(".mobile-nav__btn");
  #mobNavList = document.querySelector(".mobile-nav__list");

  // Destktop Nav
  #destNavList = document.querySelector(".navigation__list");
  #navFormBtns = document.querySelectorAll(".navigation__list .btn");

  constructor() {
    this.#addHandlerMobNavOpen();
  }

  addHandlerMobileNav(p_handlerErstellen, p_handlerTest, p_handlerRespVisible) {
    this.#mobNavList.addEventListener("click", e => {
      const btn = e.target.closest(".btn--mobile");

      if (!btn) return;
      console.log(btn);

      const btnContent = btn.textContent.trim();

      // Mobile ERSTELLEN Btn gecklickt
      if (btnContent === "Vokabel erstellen") {
        this.#destktopActiveForm(p_handlerErstellen, this.#navFormBtns[0]);
        p_handlerRespVisible(false, true);
      }

      // Mobile TEST Btn gecklickt
      if (btnContent === "Vokabel Test") {
        this.#destktopActiveForm(p_handlerTest, this.#navFormBtns[1]);
        p_handlerRespVisible(false, true);
      }

      // Mobile MEINE-Vokabeln Btn gecklickt
      if (btnContent === "Meine Vokabeln") {
        p_handlerRespVisible(true, false);
      }

      if (!(btnContent === "FAQ")) this.#mobNavVisible();
    });
  }

  addHandlerDestktopNav(p_handlerErstellen, p_handlerTest) {
    this.#destNavList.addEventListener("click", e => {
      const btn = e.target.closest(".btn");

      if (!btn) return;

      const btnContent = btn.textContent.trim();

      //?  ERSTELLEN Btn gecklickt
      if (btnContent === "Vokabel erstellen")
        this.#destktopActiveForm(p_handlerErstellen, btn);

      //? TEST Btn gecklickt
      if (btnContent === "Vokabel Test")
        this.#destktopActiveForm(p_handlerTest, btn);
    });
  }

  #destktopActiveForm(p_handler, p_btn) {
    this.#activeDestktopNavBtn(p_btn);
    p_handler();
  }

  #activeDestktopNavBtn(p_targetBtn) {
    this.#navFormBtns.forEach(p_btn => {
      p_btn.classList.remove("btn--active");
    });

    p_targetBtn.classList.add("btn--active");
  }

  #addHandlerMobNavOpen() {
    this.#mobileNavBtn.addEventListener("click", () => this.#mobNavVisible());
  }

  #mobNavVisible() {
    this.#mobNav.classList.toggle("mobile-nav--open");
  }
}

export default new NavView();
