import { arrFinally } from "./arrayPrint.js";

export const addElementMainDom = (text) => {
  arrFinally.push(text);
  console.log(`OYE ESTPY PSANDO POR AQUIIIIIIIIIIIIIIII`, arrFinally);
  //11 pq 0 no vale
  if (arrFinally.length == 11) {
    console.log("EESTOY COMPLETO", JSON.stringify(arrFinally));
    fetch("http://localhost:3000/sendData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arrFinally),
    });
  }
  const p = document.createElement("dd");
  p.textContent = text;
  const br = document.createElement("br");
  const father = document.getElementById("mainContenido");
  // console.log(father);
  father.appendChild(p);
  father.appendChild(br);
};
