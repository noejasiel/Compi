import { handleErrorsDisplay } from "./handleErrorsDisplay.js";

export const checkParameterDeclarated = (parametersFunction, code) => {
  try {
    let bool = true;
    let argumentfunction = parametersFunction[1].split(")")[0];
    let argumentFor = code.find((elemtn) => elemtn.includes("for"));
    argumentFor = argumentFor.split(",")[1].split(")")[0];
    console.log(argumentfunction, argumentFor);
    if (argumentfunction.trim() == argumentFor.trim()) {
      return bool;
    } else {
      throw new Error(`${argumentFor} no esta definida`);
    }
  } catch (error) {
    console.error(error.message);
    handleErrorsDisplay(error);
  }
};
