"use strict";

//? Problem beheben bei Mobile Ansicht mit 100vh Body!
//? wegen Adressleiste vom Browser ensteht ein unschöner effekt

const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", documentHeight);
documentHeight();
