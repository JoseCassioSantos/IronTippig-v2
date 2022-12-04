setInterval(() => {
  let novaHora = new Date();
  let data = new Date();

  let hora = novaHora.getHours();
  let minuto = novaHora.getMinutes();
  let segundo = novaHora.getSeconds();

  let meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Augosto",
    "Setembro",
    "Outubro",
    "Nov",
    "Dezembro",
  ];
  let semana = [
    "Domingo",
    "segunda-feira",
    "terça-feira",
    "quarta-feira",
    "quinta-feira",
    "sexta-feira",
    "Sabado",
  ];

  let dia = data.getDate();
  let mes = meses[data.getMonth()];
  let ano = novaHora.getFullYear();
  let dsemana = semana[data.getDay()];

  minuto = zero(minuto);
  segundo = zero(segundo);

  document.getElementById(
    "hora"
  ).innerHTML = `${hora}:${minuto}:${segundo} ${dsemana}<br> ${dia}/${mes}/${ano}`;
  document.getElementById(
    "overhora"
  ).innerHTML = `${hora}:${minuto}:${segundo}`;
  document.getElementById(
    "overdata"
  ).innerHTML = `${dsemana}<br> ${dia}/${mes}/${ano}`;
}, 1000);

zero = (x) => {
  if (x < 10) {
    x = "0" + x;
  }
  return x;
};

var elem = document.documentElement;

full = () => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
  document.getElementById("btnfull").style.display = "none";
  document.getElementById("btnffull").style.display = "inline";
};

nfull = () =>  {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
  document.getElementById("btnffull").style.display = "none";
  document.getElementById("btnfull").style.display = "inline";
}

window.addEventListener("contextmenu", (evento) => {
  evento.preventDefault();
});
