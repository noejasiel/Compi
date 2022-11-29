export const caseForIdentation = (
  i,
  newArray,
  codeIndexFor,
  expreFourSpaces,
  expreEightSpaces
) => {
  let next = codeIndexFor + 1;
  console.log(newArray, "AQUIIIIIIIIIIIIIIIIIIIIIII");
  // debugger;
  if (newArray[i].includes("for") && newArray[i].includes("range")) {
    if (expreFourSpaces.test(newArray[i])) {
      let newArrComprobate = newArray[codeIndexFor].replace(/\s{4}/, "");
      if (/^\s/.test(newArrComprobate)) {
        throw new Error(`LA IDENTACION EN ${newArrComprobate} NO ES CORRECTA`);
      }
      let nuevo;
      for (let i = 0; i < 2; i++) {
        //caso en el que hay +8 espacios
        while (expreEightSpaces.test(newArray[next])) {
          nuevo = newArray[next].replace(/\s{8}/, "");
          console.log(nuevo, "BVBHUJ");
          if (/^\s/.test(nuevo)) {
            throw new Error(`LA IDENTACION EN ${nuevo} NO ES CORRECTA`);
          }
          next += 1;
        }

        if (!newArray[next].includes("return")) {
          if (expreEightSpaces.test(newArray[next])) {
            nuevo = newArray[next].replace(/\s{8}/, "");
            console.log(nuevo, "BVBHUJ");
            if (/^\s/.test(nuevo)) {
              throw new Error(`LA IDENTACION EN ${nuevo} NO ES CORRECTA`);
            }
            next += 1;
          } else {
            throw new Error(
              `LA IDENTACION EN ${newArray[next]} NO ES CORRECTA`
            );
          }
        }
      }
    } else {
      throw new Error(
        `LA IDENTACION EN ${newArray[codeIndexFor]} NO ES CORRECTA`
      );
    }
  }
};
