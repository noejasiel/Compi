import { isEmptyLine } from "../utilities/isEmtyLine.js";
import { isVariableDeclaration } from "../funcionalidades/returnFunction.js";
import { arrayDeclaratedParametersFunctions } from "../additionals/arrayStack.js";
import { countFunctions } from "../utilities/countFunctions.js";
import { isFunction } from "../index.js";
import { arrPrimary } from "../additionals/arrPrimary.js";
import { getDataReturnVariable } from "./multi.js";
import { addElementInDom } from "../funcionalidades/addElementInDom.js";
import { handleErrorsDisplay } from "../handleComprobation/handleErrorsDisplay.js";
// import { handleErrors } from "../handleComprobation/handleErrors.js";

export const isSumFunction = (
  codeClean,
  parametersFunction,
  declarationVariable,
  codeFor
) => {
  console.log(
    codeClean,
    parametersFunction,
    declarationVariable,
    "DESDE SUMA FUCION"
  );
  codeClean = isEmptyLine(codeClean, 3);
  codeClean = isEmptyLine(codeClean, 4);

  if (isVariableDeclaration(codeClean[3])) {
    //si los datos estan bien entonces ya debugeo linea x linea
    lineAndLine(
      codeClean[3],
      parametersFunction,
      declarationVariable,
      codeFor,
      codeClean
    );
  } else {
    console.error("LOS DATOS SUBYACENTES TIENEN ERROR");
  }
};

const lineAndLine = (
  codeClean1,
  parametersFunction,
  declarationVariable,
  codeFor,
  codeComplete
) => {
  //obteiendo la iteracion de avriable en declaracion
  let variableInDeclaration = codeClean1.split("[")[1].split("]")[0];
  //obteiendo la iteracion de avriable en for
  let variableIteratorFor = codeFor.split("in")[0].split("for")[1].trim();
  console.log(variableIteratorFor, "AQUI E SLA ITERACION VARIABLE");
  // obtenemos nombre de el parametro que veine en el funcion
  let nameParameter = parametersFunction[1].split(")")[0].trim();
  arrayDeclaratedParametersFunctions.push(nameParameter);
  //obtenemos nombre de mi declaraion de variable despues del for
  // debugger;
  let variableMultiplicationParameter = codeClean1
    .split("+")[1]
    .split("[")[0]
    .trim();
  //variable del for
  let variableCodeFor = codeFor
    .split("len")[1]
    .split("(")[1]
    .split(")")[0]
    .trim();
  // let variableMultiplicationParameter = codeClean1
  //   .split("=")[1]
  //   .split("[")[0]
  //   .split("+")[1]
  //   .trim();
  let variableOriginalDeclaration = declarationVariable.split("=")[0].trim();
  let variableMultiplication = codeClean1.split("+")[0].split("=")[1].trim();
  let variableMultiplicationIguality = codeClean1.split("=")[0].trim();
  let variableReturn = getDataReturnVariable(codeComplete);
  try {
    if (
      handleErrors(
        variableInDeclaration,
        variableIteratorFor,
        variableOriginalDeclaration,
        variableMultiplication,
        variableMultiplicationIguality,
        variableReturn
      ) &&
      handleErrorParameter(
        nameParameter,
        variableMultiplicationParameter,
        variableCodeFor
      )
    ) {
      // nombre de la declaracion de la variable
      // let variableOriginalDeclaration = declarationVariable.split("=")[0].trim();
      console.log(variableOriginalDeclaration, "DESDE ACAAA");
      let expre = new RegExp(
        variableOriginalDeclaration +
          "\\s*\\=\\s*" +
          variableOriginalDeclaration +
          "\\s*\\+\\s*" +
          variableMultiplicationParameter +
          "\\s*\\[\\s*" +
          variableIteratorFor +
          "\\s*\\]$",
        "gm"
      );

      let datatta = expre.test(codeClean1.trim());
      //comprobar si la linea esat bien si no mada error
      if (!datatta) {
        throw new Error(`Rayos parece que ${codeClean1.trim()} no es correcta`);
      }

      console.log("VALOR", countFunctions, countFunctions + 1);
      // countFunctions = 2;

      let imprimir = `
        int ${parametersFunction[0]}(int *${variableMultiplicationParameter}){
        int ${variableOriginalDeclaration} = 0;
        int i =0;
        while(${nameParameter}[i] != -1 ){
            i +=1;
        }
        int ${variableIteratorFor} = 0;
          for(${variableIteratorFor} = 0; ${variableIteratorFor} < i; ${variableIteratorFor}++){
              suma += ${nameParameter}[${variableIteratorFor}];
          }
        return ${variableOriginalDeclaration};
        }`;
      addElementInDom(imprimir);
      // let elemento = document.getElementById("funciones");
      // elemento.textContent += imprimir;
      // debugger;
      countFunctions + 1;
      isFunction();
      // debugger;
    } else {
      throw new Error(`Rayos  algo no salio bien`);
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};

const handleErrors = (
  variableInDeclaration,
  variableIteratorFor,
  variableOriginalDeclaration,
  variableMultiplication,
  variableMultiplicationIguality,
  variableReturn
) => {
  try {
    let count = 0;
    let bool = true;
    if (variableInDeclaration.trim() === variableIteratorFor.trim()) {
      count += 1;
    } else {
      throw new Error(`LA VARIABLE ${variableInDeclaration} no esta definida`);
    }
    if (
      variableOriginalDeclaration.trim() ===
      variableMultiplicationIguality.trim()
    ) {
      count += 1;
    } else {
      throw new Error(
        `LA VARIABLE ${variableMultiplicationIguality} no esta definida`
      );
    }
    if (variableOriginalDeclaration.trim() == variableMultiplication.trim()) {
      count += 1;
    } else {
      throw new Error(`LA VARIABLE ${variableMultiplication} no esta definida`);
    }
    if (variableOriginalDeclaration.trim() == variableReturn.trim()) {
      count += 1;
    } else {
      throw new Error(`LA VARIABLE ${variableReturn} no esta definida`);
    }
    if (count == 4) return true;
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};

const handleErrorParameter = (
  nameParameter,
  variableDeclaration,
  variableMultiplicationParameter
) => {
  try {
    let bool = true;
    let count = 0;
    // debugger;
    if (nameParameter === variableDeclaration) {
      count += 1;
    } else {
      throw new Error(`LA VARIABLEf ${variableDeclaration} no esta definida`);
    }
    if (nameParameter === variableMultiplicationParameter) {
      count += 1;
    } else {
      throw new Error(
        `LA VARIABLE ${variableMultiplicationParameter} no esta definida`
      );
    }
    if (count == 2) return bool;
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};
