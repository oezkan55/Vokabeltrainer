import { TIMEOUT_SEC_FAIL_FETCH } from "./config.js";

export const timeoutDelVok = function (p_s, p_vokEl) {
  setTimeout(function () {
    p_vokEl.remove();
  }, p_s * 1000);
};

export const zufallsIndex = function (p_max) {
  return Math.trunc(Math.random() * p_max);
};

const timeoutFailFetch = function (p_s) {
  return new Promise(function (_, rejectFunk) {
    setTimeout(function () {
      rejectFunk(new Error("⚠️⚠️ Verbindungsproblem ⚠️⚠️"));
    }, p_s * 1000);
  });
};

export const AJAX = async function (p_gerWord) {
  try {
    const resp = await Promise.race([
      fetch(
        `https://api.mymemory.translated.net/get?q=${p_gerWord}!&langpair=de|en`
      ),
      timeoutFailFetch(TIMEOUT_SEC_FAIL_FETCH),
    ]);

    if (!resp.ok) throw new Error("Es gab leider ein Problem");

    const { responseData } = await resp.json();
    const { translatedText } = responseData;

    return translatedText;
  } catch (p_err) {
    throw p_err;
  }
};
