import { zufallsIndex, AJAX } from "./helpers.js";

export const state = {
  vokabeln: [
    { deutsch: "morgen", englisch: "morning" },
    { deutsch: "tisch", englisch: "table" },
    // { deutsch: "fahrad", englisch: "bike" },
    // { deutsch: "auto", englisch: "car" },
  ],
  test: [],
  ergebnisTest: {
    true: 0,
    false: 0,
  },
  aktuellTestVok: "",
};

export const loadEngUebersetzung = async function (p_gerWord) {
  try {
    const translateWord = await AJAX(p_gerWord);
    return translateWord;
  } catch (p_err) {
    throw p_err;
  }
};

export const saveVokabel = function (p_dataArr) {
  const data = Object.fromEntries(p_dataArr);

  state.vokabeln.push({
    deutsch: data.gerWord,
    englisch: data.engWord,
  });
};

export const delVokabel = function (p_dataVok) {
  const vokInd = state.vokabeln.findIndex(
    p_vokabel => p_vokabel.deutsch === p_dataVok
  );

  if (vokInd >= 0) state.vokabeln.splice(vokInd, 1);
};

export const auswahlVok = function () {
  const [vok] = state.test.splice(zufallsIndex(state.test.length), 1);
  state.aktuellTestVok = vok;
};

export const startVok = function () {
  state.ergebnisTest.true = 0;
  state.ergebnisTest.false = 0;

  state.test = state.vokabeln.slice();
  auswahlVok();
};

export const isVokValid = function (p_nutzerValue) {
  const isValid = state.aktuellTestVok.englisch === p_nutzerValue;
  isValid ? state.ergebnisTest.true++ : state.ergebnisTest.false++;

  return isValid;
};
