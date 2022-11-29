export const handleErrorsDisplay = (error) => {
  console.log(typeof error.message, "FROM AQUI");
  let err = {
    err: error.message,
  };
  fetch("http://localhost:3000/sendData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(err),
  });
  const father = document.getElementById("error");
  father.style.display = "block";
  const p = document.createElement("p");
  p.textContent = `${error.message} `;
  father.appendChild(p);
};
