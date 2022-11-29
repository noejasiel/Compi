const divPasos = document.getElementById("contentPasos");
const changeColor = document.getElementById("change");
const body = document.querySelector("body");
const halloCala = document.getElementsByClassName("halloCala");
const coolCala = document.getElementsByClassName("coolCala");
const reloaded = document.getElementsByClassName("reloaded")[0];

let theme = window.localStorage.getItem("theme");
if (theme != (undefined || null)) {
  body.classList = theme;
}

divPasos.addEventListener("click", () => {
  const pasos = document.getElementById("pasos");
  pasos.style.display == "none"
    ? (pasos.style.display = "block")
    : (pasos.style.display = "none");
});

reloaded.addEventListener("click", () => {
  window.location.reload();
});

changeColor.addEventListener("click", () => {
  // debugger;
  console.log(coolCala, halloCala);
  if (body.classList.contains("cool")) {
    body.classList = "hallo";
    window.localStorage.setItem("theme", "hallo");
    coolCala[0].style.display = "none";
    halloCala[0].style.display = "block";
  } else {
    window.localStorage.setItem("theme", "cool");
    body.classList = "cool";
    coolCala[0].style.display = "block";
    halloCala[0].style.display = "none";
  }
});
