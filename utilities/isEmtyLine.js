export const isEmptyLine = (lineaSeparada, contador) => {
  // debugger;
  //si la linea esta vacia la elimino
  let count = contador;
  // const expre = /\s*/g;
  const expre = /\S/g;
  //si hay lineas en blanco
  while (!expre.test(lineaSeparada[count])) {
    lineaSeparada.splice(contador, 1);
  }
  //eliminamos linea y devolvemos arreglo
  return lineaSeparada;
};
