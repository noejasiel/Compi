import { isEmptyLine } from "../utilities/isEmtyLine.js";
import { caseForIdentation } from "../utilities/caseForIdentation.js";
import { handleErrorsDisplay } from "../handleComprobation/handleErrorsDisplay.js";

const keyWords = {
  def: 0,
  if: 4,
  return: 4,
  for: 8,
};

export const comprobateIdentation = (textFunction) => {
  console.log(textFunction.split("\r\n"), "FROM text");
  let dataSplit = textFunction.split("\r\n");
  let count = 0;
  let isNewArr;
  while (dataSplit[count] != undefined) {
    isNewArr = isEmptyLine(dataSplit, count);
    count += 1;
  }
  // console.log(comprobateCase(isNewArr));
  if (comprobateCase(isNewArr)) {
    return true;
  }
  // comprobateCase(isNewArr) ? true : null;
};

const comprobateCase = (newArray) => {
  let count = 0;
  let expreZeroSpaces = /^\s{1}/g;
  let expreFourSpaces = /^\s{4}/;
  let expreEightSpaces = /^\s{8}/;
  const codeFor = (element) => element.includes("for");
  const codeIndexFor = newArray.findIndex(codeFor);
  // debugger;
  try {
    if (newArray.length > 3) {
      for (let i = 0; i < newArray.length; i++) {
        // debugger;
        //case funciones nunca tenra error
        // debugger;
        if (newArray[i].includes("def") && !expreZeroSpaces.test(newArray[i])) {
          count += 1;
        }
        //CASE for
        caseForIdentation(
          i,
          newArray,
          codeIndexFor,
          expreFourSpaces,
          expreEightSpaces
        );
        //CASE return
        if (newArray[i].includes("return")) {
          let nuevo = 0;
          if (expreFourSpaces.test(newArray[i])) {
            nuevo = newArray[i].replace(expreFourSpaces, "");
            if (/^\s/.test(nuevo)) {
              throw new Error(`LA IDENTACION EN ${nuevo} NO ES CORRECTA`);
            }
            // debugger;
            return true;
          } else {
            throw new Error(`LA IDENTACION EN ${newArray[i]} NO ES CORRECTA`);
          }
        }
        //CASE que no son palabras clave
        if (
          !newArray[i].includes("def") &&
          newArray[i + 1] != undefined &&
          newArray[i + 1].includes("for")
        ) {
          if (expreFourSpaces.test(newArray[i])) {
            let nuevo = newArray[i].replace(expreFourSpaces, "");
            if (/^\s/.test(nuevo)) {
              throw new Error(`LA IDENTACION EN ${newArray[i]} NO ES CORRECTA`);
            }
          } else {
            throw new Error(`LA IDENTACION EN ${newArray[i]} NO ES CORRECTA`);
          }
        }
      }
    }
    // CAse function void
    for (let i = 0; i < newArray.length; i++) {
      let count;
      if (newArray[i].includes("def") && !expreZeroSpaces.test(newArray[i])) {
        count += 1;
      }
      if (!newArray[i].includes("def") && newArray[i + 1] == undefined) {
        if (expreFourSpaces.test(newArray[i])) {
          let nuevo = newArray[i].replace(expreFourSpaces, "");
          if (/^\s/.test(nuevo)) {
            throw new Error(`LA IDENTACION EN ${newArray[i]} NO ES CORRECTA`);
          }
          return true;
        } else {
          throw new Error(`LA IDENTACION EN ${newArray[i]} NO ES CORRECTA`);
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
    return false;
  }
};
