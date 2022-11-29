export const isValidFor = (line) => {
  //verifico si casos de for son validos
  const expreFor =
    /for\s+[a-z_]\s+in\s+range\s*\(\s*[0-9]+\s*,\s*([a-z0-9]+|([a-zA-Z0-9]+\s*\([a-zA-Z0-9]+\)))+\s*\)\:/g;
  return expreFor.test(line);
};
