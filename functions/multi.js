import { isVariableDeclaration } from "../funcionalidades/returnFunction.js";
import { isEmptyLine } from "../utilities/isEmtyLine.js";
import { callFunction, isFunction } from "../index.js";
import { handleErrors } from "../handleComprobation/handleErrors.js";
import { addElementInDom } from "../funcionalidades/addElementInDom.js";
import { handleErrorsDisplay } from "../handleComprobation/handleErrorsDisplay.js";

export const isMultFunction = (
  codeClean,
  parametersFunction,
  declarationVariable,
  codeFor
) => {
  console.log(
    codeClean,
    parametersFunction,
    declarationVariable,
    "DESDE Multi FUCION"
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
  let variableCodeFor = codeFor
    .split("len")[1]
    .split("(")[1]
    .split(")")[0]
    .trim();
  let variableDeclaration = declarationVariable
    .split("=")[1]
    .split("[")[0]
    .trim();
  let variableMultiplicationParameter = codeClean1
    .split("=")[1]
    .split("[")[0]
    .trim();
  //obtenemos nombre de mi declaraion de variable vactual
  let variableOriginalDeclaration = declarationVariable.split("=")[0].trim();
  let variableMultiplication = codeClean1.split("*")[1].trim();
  let variableMultiplicationIguality = codeClean1.split("=")[0].trim();
  let variableReturn = getDataReturnVariable(codeComplete);

  if (
    handleErrorVariable(
      variableInDeclaration, //x
      variableIteratorFor,
      variableOriginalDeclaration,
      variableMultiplicationIguality,
      variableMultiplication,
      variableReturn
    ) &&
    handleErrorParameter(
      nameParameter,
      variableDeclaration,
      variableMultiplicationParameter,
      variableCodeFor
    )
  ) {
    //ya tengo mi variable iteradora correctamente declarada
    console.log("YEAAA");
    let imprimir = `
    int ${parametersFunction[0]}(int *${nameParameter}){
      int i =0;
      int ${variableOriginalDeclaration} = ${nameParameter}[0];
      while(${nameParameter}[i] != -1 ){
          i +=1;
      }
      int ${variableInDeclaration} = 0;
      for( ${variableInDeclaration} = 1;  ${variableInDeclaration} < i;  ${variableInDeclaration}++){
        ${variableOriginalDeclaration} *= ${nameParameter}[ ${variableInDeclaration}];
      }
      return ${variableOriginalDeclaration};
  }
    `;
    callFunction.push(imprimir);
    addElementInDom(imprimir);
    // let elemento = document.getElementById("funciones");
    // elemento.textContent += imprimir;
    isFunction();
  }
};

const handleErrorVariable = (
  variableInDeclaration, //x
  variableIteratorFor,
  variableOriginalDeclaration,
  variableMultiplicationIguality,
  variableMultiplication,
  variableReturn
) => {
  try {
    let bool = true;
    let count = 0;
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
    if (count == 4) return bool;
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};

const handleErrorParameter = (
  nameParameter,
  variableDeclaration,
  variableMultiplicationParameter,
  variableCodeFor
) => {
  let bool = true;
  let count = 0;
  if (nameParameter === variableDeclaration) {
    count += 1;
  } else {
    console.error(`LA VARIABLE ${variableDeclaration} no esta definida`);
  }
  if (nameParameter === variableMultiplicationParameter) {
    count += 1;
  } else {
    console.error(
      `LA VARIABLE ${variableMultiplicationParameter} no esta definida`
    );
  }
  if (nameParameter == variableCodeFor) {
    count += 1;
  } else {
    console.error(`LA VARIABLE ${variableCodeFor} no esta definida`);
  }
  if (count == 3) return bool;
};

export const getDataReturnVariable = (codeComplete) => {
  return codeComplete
    .find((element) => element.includes("return"))
    .split("return")[1]
    .trim();
};
