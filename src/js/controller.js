import * as model from "./model.js";
import { TIMEOUT_SEC_NEXT_VOK } from "./config.js";
import vokErstellenView from "./views/VokErstellenView.js";
import vokLeisteView from "./views/VokLeisteView.js";
import vokTestView from "./views/VokTestView.js";
import modalScreenView from "./views/ModalScreenView.js";
import navView from "./views/NavView.js";

/////////////////////////////////////////////////////
//? === Vok Übersetz/Erstell/Lösch === ///////////////
const controllInputUebersetzen = async function (p_GerWord) {
  try {
    const engUebersetz = await model.loadEngUebersetzung(p_GerWord);
    vokErstellenView.renderEngUebersetzung(engUebersetz);
  } catch (p_err) {
    vokErstellenView.errorMessage(p_err.message);
  }
};

const controllVokErstellen = function (p_formDataArr) {
  model.saveVokabel(p_formDataArr);
  vokErstellenView.renderMessage();
  vokLeisteView.renderVokabel(model.state.vokabeln.at(-1));
};

const controllVokLöschen = function (p_dataVok, p_elVok) {
  model.delVokabel(p_dataVok);
  vokLeisteView.removeVokOfView(p_elVok);
};

//////////////////////////////////////////////
//? === Vok-Test starten === /////////////////////////
const controllTestStart = function () {
  vokLeisteView.visibleVokList("add");

  model.startVok();
  vokTestView.updateAnzahlVok(model.state);

  // Wenn keine Vokabeln, Test sofort beenden
  if (model.state.vokabeln.length === 0)
    return vokTestView.testEnd(model.state);

  vokTestView.renderMessage(model.state.aktuellTestVok.deutsch);
  vokTestView.formReset();
};

const controllTestNextVok = function () {
  model.state.ergebnisTest.false++;

  // Vokabeltest ist zu Ende
  if (model.state.test.length === 0) vokTestView.testEnd(model.state);

  // Nächste Vokabel
  if (model.state.test.length > 0) {
    model.auswahlVok();
    vokTestView.vokUeberspringen(model.state);
  }
};

const controllVokTestCheck = function (p_userValue) {
  const isValid = model.isVokValid(p_userValue);

  // Vok Ergebnis richtig
  if (isValid && model.state.test.length > 0) {
    vokTestView.vokValidMessage(isValid);
    model.auswahlVok();

    // Verzögerung für nächste Vokabel
    setTimeout(function () {
      vokTestView.vokUeberspringen(model.state);
    }, TIMEOUT_SEC_NEXT_VOK * 1000);

    // Funktion beenden
    return;
  }

  // Vok Ergebnis falsch
  if (!isValid) vokTestView.vokValidMessage(isValid);

  // Vok Test zu Ende
  if (isValid && model.state.test.length === 0)
    vokTestView.testEnd(model.state, isValid);
};

////////////////////////////////////////////////////////////
//? === Section Navigation === //////////////////////////////
const controllErstellenFormAktiv = function () {
  vokErstellenView.formVokErstellenVisible();
  vokLeisteView.visibleVokList();
  vokTestView.formReset();
};

const controllTestFormAktiv = function () {
  vokTestView.formVokTestVisible(controllTestStart);
};

const controllMobileVisibility = function (p_isLeisteVisibl, p_isFormVisibl) {
  vokLeisteView.MobileVisibilityVokLeiste(p_isLeisteVisibl);

  vokErstellenView.mobileVisibilityForms(p_isFormVisibl);
};

//? === Programm Start === ////////////////////////////////////
const init = function () {
  vokErstellenView.addHandlerVokErstellen(controllVokErstellen);
  vokErstellenView.addHandlerGerWordUebersetzen(controllInputUebersetzen);

  vokTestView.addHandlerVokTestCheck(controllVokTestCheck);
  vokTestView.addHandlerNextVok(controllTestNextVok);

  vokLeisteView.renderVokabelList(model.state.vokabeln);
  vokLeisteView.addHandlerDeleteVokabel(controllVokLöschen);

  modalScreenView;

  navView.addHandlerMobileNav(
    controllErstellenFormAktiv,
    controllTestFormAktiv,
    controllMobileVisibility
  );

  navView.addHandlerDestktopNav(
    controllErstellenFormAktiv,
    controllTestFormAktiv
  );
};
init();
