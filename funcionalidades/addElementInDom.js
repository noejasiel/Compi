import { arrFinally } from "./arrayPrint.js";

export const addElementInDom = (text) => {
  arrFinally.push(text);
  const p = document.createElement("dd");
  p.textContent = text;
  const br = document.createElement("br");

  const father = document.getElementById("funciones");
  console.log(father);
  father.appendChild(p);
  father.appendChild(br);
};
