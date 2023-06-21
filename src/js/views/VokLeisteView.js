import icons from "url:../../img/icons-sprite.svg";
import { timeoutDelVok } from "../helpers.js";
import { TIMEOUT_SEC_DEL_VOK } from "../config.js";

class VokLeisteView {
  vokabelListe = document.querySelector(".vokabellist");
  #vokLeiste = document.querySelector(".vokabelleiste");
  #anwendungMessage = document.querySelector(".info");

  renderVokabelList(p_vokArr) {
    this.vokabelListe.textContent = "";
    p_vokArr.forEach(p_vokObj => this.#getMarkup(p_vokObj));
  }

  renderVokabel(p_vokObj) {
    this.#getMarkup(p_vokObj);
  }

  #getMarkup(p_vokObj) {
    const markup = `
      <li class="vokabellist__item" data-vok="${p_vokObj.deutsch}">
        <div class="vokabellist__vokabel">
          <span class="vokabellist__wort">${p_vokObj.deutsch}</span>
          <span class="vokabellist__icon-pfeil u-vertikal-center">
            <svg>
              <use href="${icons}#icon-pfeil-rechts" />
            </svg>
          </span>
          <span class="vokabellist__wort">${p_vokObj.englisch}</span>
          <span class="vokabellist__icon-flag u-vertikal-center">
            <svg>
              <use href="${icons}#icon-german-flag" />
            </svg>
          </span>
          <button
            class="btn btn--vokabel"
            title="Vokabel löschen"
          >
            <svg>
              <use href="${icons}#icon-muelleimer" />
            </svg>
          </button>
          <span class="vokabellist__icon-flag u-vertikal-center">
            <svg>
              <use href="${icons}#icon-england-flag" />
            </svg>
          </span>
        </div>
      </li>
    `;

    this.vokabelListe.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerDeleteVokabel(p_handlerLöschen) {
    this.vokabelListe.addEventListener("click", function (e) {
      const delBtn = e.target.closest(".btn--vokabel");

      if (!delBtn) return;

      const elVok = e.target.closest(".vokabellist__item");
      elVok.classList.add("vokabellist__item--delete");
      const dataVok = elVok.dataset.vok;

      p_handlerLöschen(dataVok, elVok);
    });
  }

  removeVokOfView(p_elVok) {
    timeoutDelVok(TIMEOUT_SEC_DEL_VOK, p_elVok);
    this.#anwendungMessage.innerHTML = `
      <p class="info__message info__message--geloescht">
        Vokabel gelöscht<span><svg><use href="${icons}#icon-muelleimer" /></svg></span>
      </p>
    `;
  }

  visibleVokList(p_classMeth = "remove") {
    this.vokabelListe.classList[p_classMeth]("u-visiblity-hidden");
  }

  MobileVisibilityVokLeiste(p_state) {
    this.#vokLeiste.style.display = `${p_state ? "block" : "none"}`;
    if (p_state) this.visibleVokList();
  }
}
export default new VokLeisteView();
