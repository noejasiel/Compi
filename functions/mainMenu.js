import { addElementInDom } from "../funcionalidades/addElementInDom.js";
import { addElementMainDom } from "../funcionalidades/addElementMainDom.js";
import { handleErrorsDisplay } from "../handleComprobation/handleErrorsDisplay.js";
import { callFunction } from "../index.js";
import { commentary } from "../index.js";
import { isEmptyLine } from "../utilities/isEmtyLine.js";

//variables declaradas solo para tener el dato
let variablesDeclarated = [];
//variables que se iran declarando
let variablesUsed = [];

export const mainMenu = (main) => {
  // debugger;
  //pq al momento del splt hay basura
  try {
    if (!addCommentary(main)) {
      throw new Error(
        `VAYA AH OCURRIDO UN ERROR AL MOMEMNTO DE TRATAR CON LOS COMENTARIO`
      );
    }
    main = addCommentary(main);
    // debugger;

    let count = 2;
    let zeroSpaces = /^\s/m;
    while (main[count] != undefined) {
      // debugger;
      let newLine = isEmptyLine(main, count);
      if (!zeroSpaces.test(newLine[count].trim())) {
        if (
          comprobateFunctionVariable(newLine[count].trim()) ||
          comprobateDeclarationVariable(newLine[count].trim())
        ) {
          count += 1;
        } else {
          throw new Error(`VAYA PARECCE QUE ${newLine[count]} TIENE UN ERROR`);
        }
      } else {
        throw new Error(
          `VAYA PARECCE QUE LA IDENTACION ${newLine[count]} NO ES CORRECTA`
        );
      }
    }
    if (count == 10) {
      // return true;
      lineAndLine(main);
    }
  } catch (error) {
    handleErrorsDisplay(error);
    console.error(error.message);
    return false;
  }
};

const comprobateDeclarationVariable = (line) => {
  const expreGral =
    /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)([a-zA-Z]*)\s*\(\s*((("\s*.*")\s*\)$)|(int\s*\([a-zA-z]+\){2}$)|([a-zA-Z]*\))$)/;
  if (expreGral.test(line)) {
    return true;
  }
};
const comprobateFunctionVariable = (line) => {
  // debugger;
  const expreGral = /^[a-zA-z]*\s*\(\s*".*"(\)$|\s*,\s*[a-zA-Z]+\s*\)$)/g;
  //  ? true : false;
  if (expreGral.test(line)) {
    return true;
  }
};

const lineAndLine = (main) => {
  try {
    let variableMain = "";
    let expreVoidImpresion = /^[a-zA-z]*\s*\(\s*".*"\s*,\s*[a-zA-Z]+\s*\)$/;
    // let expreSumProductFunction =
    //   /([a-zA-z][a-zA-Z0-9_]+)(\s*)=(\s*)([a-zA-Z]*)\s*\(\s*(([a-zA-Z]*\))$)/;
    let expreSumProductFunction = new RegExp(
      "[a-zA-z][a-zA-Z0-9_]+\\s*=\\s*[a-zA-Z]*\\s*\\(\\s*[a-zA-Z]*\\)$",
      "gm"
    );
    // let expree = new RegExp(
    //   variableMain + "\\s*\\=\\s*[a-zA-Z]*\\s*\\(\\s*",
    //   "gm"
    // );
    let expre = new RegExp(
      "Datos\\s*\\=\\s*[a-zA-Z]+\\s*\\(\\s*int\\s*\\([a-zA-Z]+\\)\\)$",
      "gm"
    );
    // for (let i = 2; i < main.length; i++) {
    //   setVariableDeclaration(main[i]);
    // }
    for (let i = 2; i < main.length; i++) {
      // setea las variables en un array para ver si en los parametros
      //se encuentran estas
      setVariableDeclaration(main[i]);
      //case printf
      if (main[i].includes("print")) {
        let infoFunction = main[i].split(/\"/)[1].split(/\"/)[0];
        let functionC = `printf("${infoFunction} \\n");`;
        addElementMainDom(functionC);
      }
      //case  scanf in c y crear la variable
      if (main[i].includes("input")) {
        let infoFunction = main[i].split(/\"/)[1].split(/\"/)[0];
        variableMain = main[i].split("=")[0];
        if (!(existVariableInArrayDeclaration(variableMain) != undefined)) {
          throw new Error(
            `VAYA PARECE QUE LA Variable ${variableMain} NO ESTA DEFINIDAA`
          );
        }
        let functionC =
          getNewVarableDeclaration(variableMain) +
          `printf("\\n${infoFunction} ");
        scanf("%d", &${variableMain});`;
        addElementMainDom(functionC);
      }
      // case impresion function void
      if (expreVoidImpresion.test(main[i])) {
        // debugger;
        //nombre de la funcion
        let nameFunctionImpression = main[i].split("(")[0];
        //lo que trae la funcion
        console.log(main[i].split(/\"/)[1]);
        let dataInTheFunction = main[i].split(/\"/)[1];
        //ver si la funcion existe en las funciones declaradas
        if (!getDataArray(nameFunctionImpression)) {
          throw new Error(
            `VAYA PARECE QUE LA FUNCION ${nameFunctionImpression} NO EXISTE`
          );
        }
        //comprobar si existe esa variable
        if (
          !existVariableInArrayDeclaration(main[i].split(",")[1].split(")")[0])
        ) {
          throw new Error(
            `VAYA PARECE QUE LA VARIABLE ${
              main[i].split(",")[1].split(")")[0]
            } NO ESTA DEFINIDA`
          );
        }
        let functionC = `${nameFunctionImpression}("\n${dataInTheFunction} %d ", ${
          main[i].split(",")[1].split(")")[0]
        });`;
        addElementMainDom(functionC);
      }
      // case llenar lista
      if (variableMain != "") {
        let expree = new RegExp(
          main[i].split("=")[0].trim() +
            "\\s*=\\s*[a-zA-Z]+\\s*\\(\\s*int\\s*\\([a-zA-Z]+\\)\\)$",
          "gm"
        );
        //ver si ya esta en el array el dato pero si va a esatr
        if (
          !existVariableInArrayDeclaration(main[i].split("=")[0]) &&
          expre.test(main[i])
        ) {
          throw new Error(
            `VAYA PARECE QUE LA VARIABLE ${
              main[i].split("=")[0]
            } NO ESTA DEFINIDA`
          );
        }
        if (expree.test(main[i])) {
          let nameFunctionLlenar = main[i].split("=")[1].split("(")[0].trim();
          if (!getDataArray(nameFunctionLlenar)) {
            throw new Error(
              `VAYA PARECE QUE LA FUNCION ${nameFunctionLlenar} NO EXISTE`
            );
          }
          let dat = getNewVarableDeclaration(main[i].split("=")[0]);
          console.log(dat);
          let functionC;
          let isVariableParameter = main[i]
            .split("int")[1]
            .split("(")[1]
            .split(")")[0];
          //si el dato del parametro esta definido o no
          if (!existVariableInArrayDeclaration(isVariableParameter)) {
            throw new Error(
              `VAYA PARECE QUE ${isVariableParameter} NO ESTA DECLARADA`
            );
          }
          if (dat.includes("int")) {
            functionC =
              dat +
              `${main[i].split("=")[0]} = llenarLista(${
                main[i].split("=")[0]
              });`;
          } else {
            functionC = `
              ${dat} = ${nameFunctionLlenar}(${dat});`;
          }
          addElementMainDom(functionC);
        }
        //ya imprimo pero ver si esta ya declarado ese dato si no lo tarigo
        console.log(expree.test(main[i]));
        console.log(!expree.test(main[i]));
      }
      //case sum y Product
      if (expreSumProductFunction.test(main[i])) {
        // debugger;
        //nombre de la funcion a la que llama
        let nameFunctionSumPro = main[i].split("(")[0].split("=")[1].trim();
        //nombre de la variable suma =
        let variableSearch = main[i].split("=")[0];
        let existVariable = existVariableInArrayDeclaration(variableSearch);
        //verificar si esa variable ya habia sido declarada
        let varaibleComprobate = getNewVarableDeclaration(variableSearch);
        //ver si la variale del parametro ya esta declarada
        let variableParameter = main[i].split("(")[1].split(")")[0];
        let resutDeclaratedvariable =
          existVariableInArrayDeclaration(variableParameter);
        if (resutDeclaratedvariable == undefined) {
          throw new Error(
            `VAYA PARECE QUE ${variableParameter} NO ESTA DECLARADA`
          );
        }
        //ver si la funcion ya esta declarada en las funciones
        if (!getDataArray(nameFunctionSumPro)) {
          throw new Error(
            `VAYA PARECE QUE LA FUNCION ${nameFunctionSumPro} NO EXISTE`
          );
        }
        //Imprimir
        let functionC =
          varaibleComprobate +
          `${variableSearch} = ${nameFunctionSumPro}(${variableParameter});`;
        addElementMainDom(functionC);
      }
    }
    commentsPrint();
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};

const getDataArray = (nameFunctionImpression) => {
  // debugger;
  let data = callFunction.find((element) => element == nameFunctionImpression);
  return data;
};

//varaibles que ya se declararon
const getNewVarableDeclaration = (variableNew) => {
  // debugger;
  let variableExist = variablesUsed.find((element) => element == variableNew);
  let newVarableDeclaration;
  if (variableExist == undefined) {
    variablesUsed.push(variableNew);
    newVarableDeclaration = `int ${variableNew} = 0;`;
  }

  return variableExist ?? `int *${variableNew} = 0;`;
};

const setVariableDeclaration = (line) => {
  let data = comprobateDeclarationVariable(line);
  if (data != undefined) {
    //variables ya en el stack
    variablesDeclarated.push(line.split("=")[0]);
    console.log(variablesDeclarated);
  }
};

const existVariableInArrayDeclaration = (variable) => {
  let variableExist = variablesDeclarated.find(
    (element) => element == variable
  );
  return variableExist;
};

const addCommentary = (imprimir) => {
  // debugger;
  let expreComentary = /#.*/;
  let nameFunction;
  let noDlecarated = /^[a-zA-z]*\s*\(\s*".*"\s*/;
  let declarated = /[a-zA-z][a-zA-Z0-9_]+\s*=\s*[a-zA-Z]*\s*\(\s*/;
  let result;
  for (let i = 2; i < imprimir.length; i++) {
    if (expreComentary.test(imprimir[i])) {
      if (noDlecarated.test(imprimir[i])) {
        if (expreComentary.exec(imprimir[i])[0]) {
          //añadir nameFunction linea y comentario
          nameFunction = imprimir[i].split("(")[0].trim();
          commentary.push(nameFunction);
          commentary.push(i);
          commentary.push(expreComentary.exec(imprimir[i])[0]);
        }
      }
      if (declarated.test(imprimir[i])) {
        if (expreComentary.exec(imprimir[i])[0]) {
          //añadir nameFunction linea y comentario
          nameFunction = imprimir[i].split("=")[0].trim();
          commentary.push(nameFunction);
          commentary.push(i);
          commentary.push(expreComentary.exec(imprimir[i])[0]);
        }
      }
      if (/^#.*/.test(imprimir[i].trim())) {
        commentary.push("main");
        commentary.push(i);
        commentary.push(expreComentary.exec(imprimir[i])[0]);
      }
      imprimir[i] = imprimir[i].replace(expreComentary, "");
    }
  }
  return imprimir;
};

const commentsPrint = () => {
  const father = document.getElementById("comments");
  for (let i = 0; i < commentary.length; i += 3) {
    const p = document.createElement("p");
    p.textContent += `en la funcion ${commentary[i]} en la linea ${
      commentary[i + 1]
    } esta el comentario "${commentary[i + 2]}" `;
    father.appendChild(p);
  }
};
