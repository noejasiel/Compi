// import { stackDeclarationVariables } from "../additionals/stackDeclarationVariables.js";

import { handleErrorsDisplay } from "../handleComprobation/handleErrorsDisplay.js";

export const handleErrors = (
  codeClean,
  nameVariableDeclaration,
  parameterAppend,
  nameArrAppend,
  nameVariabledeclarationArr, //bueno
  returnnVariable
) => {
  try {
    let bool = true;
    // debugger;
    let count = 0;
    if (nameVariableDeclaration.trim() == parameterAppend.trim()) {
      count = count + 1;
    } else {
      throw new Error(` LA VARIABLE ${parameterAppend} NO ESTA DEFINIDA`);
      // console.error(` LA VARIABLE ${parameterAppend} NO ESTA DEFINIDA`);
    }
    if (nameVariabledeclarationArr.trim() == nameArrAppend.trim()) {
      count = count + 1;
    } else {
      throw new Error(`${nameArrAppend} no esta definida en append`);
    }
    if (nameVariabledeclarationArr.trim() == returnnVariable.trim()) {
      count = count + 1;
    } else {
      throw new Error(`${returnnVariable} no esta definida en el return`);
      // console.error(`${returnnVariable} no esta definida en el return`);
    }
    if (count == 3) return bool;
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};
