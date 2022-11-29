import { parametrosPrintf } from "./parametrosPrintf.js";
import { comparation } from "../additionals/dictionary.js";
import { isFunction } from "../index.js";
import { callFunction } from "../index.js";
import { addElementInDom } from "./addElementInDom.js";
import { handleErrorsDisplay } from "../handleComprobation/handleErrorsDisplay.js";

export const voidFunction = (contenido, parametersFunction) => {
  try {
    //la funcion necesita parametros, si tiene solo un parentesis entonces
    //no hay parametros
    let exprePrintFunction = /^print\s*\(\s*[a-z]+\s*,\s*[a-zA-Z]+\s*\)$/;
    let functionComprobate = contenido
      .split(":")
      [contenido.split(":").length - 1].trim();
    if (parametersFunction[1] == ")") {
      throw new Error("la funcion no tiene parametros");
    }

    if (!exprePrintFunction.test(functionComprobate)) {
      throw new Error(`LA LINEA ${functionComprobate} NO ES VALIDA`);
    }
    //VER SI LOS PARAMETROS SON IGUALES A LOS DE LA FUNCION
    console.log(parametersFunction, "from try");
    let srtfunction;
    console.log(contenido.split(":")[contenido.split(":").length - 1]);
    //aqui me deja solo con la info que trae la funcion
    let bodyFunction = contenido
      .split(":")
      [contenido.split(":").length - 1].split("(")[1]
      .split(",");
    let parameterOnePrint = bodyFunction[0].trim();
    let parameterTwoPrint = bodyFunction[1]
      .replace("\r\n", "")
      .split(")")[0]
      .trim();
    //aqui tiene el nombre de la funcion para imprimmir y
    //los datos que imprimira
    let parametrosSeparados = parametersFunction[1].split(",");
    let parameterOneFunction = parametrosSeparados[0].trim();
    let parameterTwoFunction = parametrosSeparados[1].split(")")[0].trim();
    if (parameterOneFunction != parameterOnePrint) {
      throw new Error(`LA VARIABLE ${parameterOnePrint} NO ESTA DEFINIDA`);
    }
    if (parameterTwoFunction != parameterTwoPrint) {
      throw new Error(`LA VARIABLE ${parameterTwoPrint} NO ESTA DEFINIDA`);
    }
    srtfunction = `void ${parametersFunction[0]} \( char* ${parametrosSeparados[0]}, int ${parametrosSeparados[1]} \{ ${comparation.print}(${parametersFunction[1]}; }`;
    // let elemento = document.getElementById("funciones");
    // elemento.textContent += srtfunction;
    callFunction.push(srtfunction);
    addElementInDom(srtfunction);
    isFunction();
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};
