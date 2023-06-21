import FormView from "./FormView.js";
import icons from "url:../../img/icons-sprite.svg";

class VokTestView extends FormView {
  #form = document.querySelector(".test-form");
  #validMessage = document.querySelector(".test-form__message");
  #anzahlVok = document.querySelector(".test-form__vok-number");
  #nextVokBtn = document.querySelector(".btn--next-vok");

  addHandlerVokTestCheck(p_handlerVokTestCheck) {
    this.#form.addEventListener("submit", function (e) {
      e.preventDefault();

      const inpValue = e.target[0].value
        .toLocaleLowerCase()
        .trim()
        .replaceAll(" ", "");

      p_handlerVokTestCheck(inpValue);
      this.reset();
    });
  }

  addHandlerNextVok(p_handlerNextVok) {
    this.#nextVokBtn.addEventListener("click", function () {
      p_handlerNextVok();
    });
  }

  updateAnzahlVok(p_vokInfos) {
    this.#anzahlVok.textContent = `${p_vokInfos.test.length + 1} / ${
      p_vokInfos.vokabeln.length
    }`;
  }

  vokValidMessage(p_isValid = undefined) {
    this.#validMessage.innerHTML = `${
      p_isValid
        ? `<span class="test-form__message valid">🎉🎉Richtig 😁🎉🎉</span>`
        : `<span class="test-form__message not-valid">❌Leider falch 🫣❌</span>`
    }`;

    if (p_isValid === undefined) this.#validMessage.textContent = "???";
  }

  vokUeberspringen(p_vokInfos) {
    this.vokValidMessage();
    this.updateAnzahlVok(p_vokInfos);
    this.renderMessage(p_vokInfos.aktuellTestVok.deutsch);
  }

  testEnd(p_vokInfos, p_isVokValid) {
    this.updateAnzahlVok(p_vokInfos);
    this.vokValidMessage(p_isVokValid);

    this.messageBox.innerHTML = `

    <div class="info__message info__message--ende">
      <p>Vokabeltest ist zu Ende🙂</p>
      <p>
        <span class="anwendung__icon-true">
          <svg>
            <use href="${icons}#icon-check" />
          </svg>
          ${p_vokInfos.ergebnisTest.true}
        </span>
        <span class="anwendung__icon-false">
          <svg>
            <use href="${icons}#icon-false" />
          </svg>
          ${p_vokInfos.ergebnisTest.false}
        </span>
      </p>
    </div>  
    `;

    this.#form.lastElementChild.classList.remove("u-visiblity-hidden");
  }

  getAnwendungMessage(p_vokDe) {
    return `
      <p class="info__message info__message--test">
        <span class="anwendung__first-message">Was bedeutet</span>
        <span class="anwendung__second-message">${p_vokDe}</span>
      </p>
    `;
  }

  formReset() {
    this.#form.lastElementChild.classList.add("u-visiblity-hidden");
    this.vokValidMessage();
  }
}

export default new VokTestView();
