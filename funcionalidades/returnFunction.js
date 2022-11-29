import { comparation } from "../additionals/dictionary.js";
import { parametrosPrintf } from "./parametrosPrintf.js";
import { isEmptyLine } from "../utilities/isEmtyLine.js";
import { isValidFor } from "../utilities/isValidFor.js";
import { isSumFunction } from "../functions/sum.js";
import { handleErrors } from "../handleComprobation/declarationVariable.js";
import { checkParameterDeclarated } from "../handleComprobation/checkParameterDeclarated.js";
import { isFunction } from "../index.js";
import { isMultFunction } from "../functions/multi.js";
import { callFunction } from "../index.js";
import { addElementInDom } from "./addElementInDom.js";
import { handleErrorsDisplay } from "../handleComprobation/handleErrorsDisplay.js";

export const returnWithFunction = (contenido, parametersFunction) => {
  try {
    // debugger;
    let newContent = contenido.split("\r");

    // let newContent = contenido.split("\r");
    let contador = 1;
    // debugger;
    // envia la linea siguiente avr si no esta vacia COMPROBAR
    // SI NO HAY INEAS RARAS, ---> VER LIBRETAS <---
    let newCleanCode = isEmptyLine(newContent, contador);
    //comprobar si la linea sig declara alguntipo de variable
    if (isVariableDeclaration(newCleanCode[1], newContent)) {
      console.log(
        "SOY UNA DECLARSCION DE VARIABLE VALIDA",
        newCleanCode[1],
        newContent
      );
      typeVariable(newCleanCode[1], parametersFunction, newCleanCode);
    } else {
      throw new Error("error se esperaba una declaracion de variable");

      // console.error("error se esperaba una declaracion de variable");
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
  //Separamos el tetxo en lineas
};

export const isVariableDeclaration = (firtstLine) => {
  try {
    const declarationVariableGeneralExpe =
      /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)((int\s*\(\s*input\s*\(\s*"(\s*[a-zA-Z0-9]*\s*)*(\:|)\s*"\s*\){2})|((int)(?!\())|(([a-zA-Z0-9]+)$(?!\())|"\s*.*\s*"|([0-9]+[a-zA-Z]*)+|([a-zA-Z]+((\[[0-9]\])*))|\[\]|\{\}|[a-zA-Z]+\s*[+]\s*[a-zA-Z]+\s*([[]\s*[a-z]*[0-9]*\s*]+))/g;
    const bool = true;
    if (declarationVariableGeneralExpe.test(firtstLine)) {
      return bool;
    } else {
      throw new Error(`Hay un ERROR En ${firtstLine.trim()}`);
      // console.error(`Hay un ERROR En ${firtstLine.trim()}`);
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
  // const declarationVariableGeneralExpe =
  //   /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)(([a-zA-Z]+\s*\(\s*[a-z]+\s*\(\s*"(\s*[a-zA-Z0-9]*\s*)*(\:|)\s*"\s*\){2})|((int)(?!\())|"\s*.*\s*"|([0-9]+[a-zA-Z]*)+|([a-zA-Z]+((\[[0-9]\])*))|\[\]|\{\}|[a-zA-Z]+\s*[+]\s*[a-zA-Z]+\s*([[]\s*[a-z]*[0-9]*\s*]+))/g;
};

const typeVariable = (lineaSeparada, parametersFunction, code) => {
  let typeFunction;
  // debugger;
  let multiExpre =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)(([a-zA-Z]+((\[[0-9]\])*)))/m;
  let sumExpre = /(^[a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*[0-9]+$)/m;
  let arrExpre = /(^[a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*\[\s*\]+$)/m;
  lineaSeparada = lineaSeparada.split("\n")[1].trim();
  console.log(
    parametersFunction[1].split(")")[0],
    multiExpre.test(lineaSeparada)
  );
  if (arrExpre.test(lineaSeparada)) {
    //es array
    typeFunction = 1;
    //se verifica si el for esta correcto y su contenido despues de comprobar el arreglo
    verifyFunctionFill(code, parametersFunction, lineaSeparada, typeFunction);
  }
  //aqui hago expre regular para verificar
  else if (multiExpre.test(lineaSeparada)) {
    typeFunction = 3;
    verifyFunctionFill(code, parametersFunction, lineaSeparada, typeFunction);
  } else if (sumExpre.test(lineaSeparada)) {
    typeFunction = 2;
    verifyFunctionFill(code, parametersFunction, lineaSeparada, typeFunction);
  }
};

const verifyFunctionFill = (
  code,
  parametersFunction,
  declarationVariable,
  typeFunction
) => {
  //limpiamos de espacios en blanco
  let codeClean = isEmptyLine(code, 2);
  //indicar si hay un for, si no decir que esperaba uno y dara error ----Z>>>> OJO AQUIIII

  //se comprueba si la funcion for es aceptada
  try {
    if (isValidFor(codeClean[2])) {
      console.log("ES FOR VALIDO");
      if (typeFunction == 1) {
        //llenar lista
        isArrayFunction(
          codeClean,
          parametersFunction,
          declarationVariable,
          codeClean[2],
          code
        );
      } else if (typeFunction == 2) {
        isSumFunction(
          codeClean,
          parametersFunction,
          declarationVariable,
          codeClean[2]
        );
      } else if (typeFunction == 3) {
        // debugger;
        isMultFunction(
          codeClean,
          parametersFunction,
          declarationVariable,
          codeClean[2]
        );
      }
    } else {
      throw new Error(`La Linea ${codeClean[2]} tiene un error`);
      console.error("La Linea for tiene un error");
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};

const verifyAppendArr = (
  codeClean,
  codeElementprevious,
  declarationVariable,
  code
) => {
  try {
    // debugger;
    let expreGralAppendLine =
      /(^[a-zA-z][a-zA-Z_]*\.append\(\s*[a-zA-z]*\s*\))/g;
    if (!expreGralAppendLine.test(codeClean.trim())) {
      throw new Error(`UY LA LINEA ${codeClean.trim()} TIENE UN ERROR`);
    }
    //name de la variable []
    let nameVariabledeclarationArr = declarationVariable.split("=")[0].trim();
    //obteniendo la variable de retorno del return
    let returnnVariable = code
      .find((data) => data.includes("return"))
      .split("return")[1]
      .trim();
    // nombre de la variable ya declarada anteriormente
    let nameVariableDeclaration = codeElementprevious.split("=")[0].trim();
    // stackDeclarationVariables.push(nameVariableDeclaration);
    const bool = true;
    const codeSplit = codeClean.split(".");
    // nombre de la variable
    const nameArrAppend = codeSplit[0].trim();
    //obteniendo parametro que esta en append
    ////no JALA PQ NO HAY ESE PARENTESIS
    let parameterAppend = codeSplit[1].split("(")[1].split(")")[0];
    nameArrAppend.replace(/\n/g, "");
    // ver si ya esta declarado
    //se verifica si el elemento en parametros de append
    //esta declarado
    //esat verifica si las variables estan declaradas
    if (
      handleErrors(
        codeClean,
        nameVariableDeclaration,
        parameterAppend,
        nameArrAppend,
        nameVariabledeclarationArr,
        returnnVariable
      )
    ) {
      const newExpre = new RegExp(
        //expresion regular dinamica
        nameArrAppend + "\\.append\\(\\s*" + parameterAppend + "\\s*\\)",
        "g"
      );
      console.log(newExpre.test(codeClean), "Y ENTRI");
      // debugger;
      if (!newExpre.test(codeClean.trim())) {
        return bool;
      } else {
        console.error(`LA LINEA ${codeClean.trim()} TIENE UN ERROR`);
      }
    } else {
      throw new Error(
        `Vaya parece que ---> ${parameterAppend.trim()} 0 ${nameArrAppend.trim()} o ${returnnVariable} <----  no esta declarada`
      );
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};

const isArrayFunction = (
  codeClean,
  parametersFunction,
  declarationVariable,
  codeCleanLine,
  code
) => {
  try {
    codeClean = isEmptyLine(codeClean, 3);
    codeClean = isEmptyLine(codeClean, 4);
    if (
      isVariableDeclaration(codeClean[3]) &&
      verifyAppendArr(codeClean[4], codeClean[3], declarationVariable, code) &&
      checkParameterDeclarated(parametersFunction, code)
    ) {
      //si los datos estan bien entonces ya debugeo linea x linea
      lineAndLine(
        codeClean[3],
        codeClean[4],
        parametersFunction,
        declarationVariable,
        codeCleanLine
      );
    } else {
      throw new Error("LOS DATOS SUBYACENTES TIENEN ERROR");
      // console.error("LOS DATOS SUBYACENTES TIENEN ERROR");
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
  //si for esta bien verificamos dentro
};

const lineAndLine = (
  codeClean1,
  codeClean2,
  parametersFunction,
  declarationVariable,
  codeCleanLineFor
) => {
  // debugger;
  //obtener desde donde empieza la iteraciond e for
  let numberIterationFor = codeCleanLineFor.split(",")[0].split("(")[1].trim();
  const codeInPrintf = codeClean1.split(/"/)[1].trim();
  let parameterFor = parametersFunction[1].split(")")[0].trim();
  let variableArr = declarationVariable.split("=")[0].trim();
  //sacar variable de iteracion en el for
  let variableIteratorFor = codeCleanLineFor
    .split("in")[0]
    .split("for")[1]
    .trim();

  let expre =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)(int\s*\(\s*input\s*\(\s*"(\s*[a-zA-Z0-9]*\s*)*(\:|)\s*"\s*\){2})/g;
  //funcion para coprobar la primera linea
  // debugger;
  if (expre.test(codeClean1)) {
    let imprimir = `
    int *${parametersFunction[0]}(int ${parameterFor}){
    static int* ${variableArr};
    ${variableArr} = (int*)malloc(${parameterFor} * sizeof(int));
    int ${variableIteratorFor};
    for( ${variableIteratorFor}=${numberIterationFor}; ${variableIteratorFor}< ${parameterFor}; ${variableIteratorFor}++){
      printf("${codeInPrintf}");
      scanf("%d", &${variableArr}[${variableIteratorFor}]);
    }
    ${variableArr}[${parameterFor}] = -1;
    return ${variableArr};
    }`;
    addElementInDom(imprimir);
    // let elemento = document.getElementById("funciones");
    // elemento.innerHTML += imprimir + "</br>";
    // elemento.innerHTML += "</br>";
    callFunction.push(imprimir);
    isFunction();
  } else {
    console.error(`VAYA PARECE QUE HAY UN ERROR EN ${codeClean1.trim()}`);
  }
};
