novo = () => {
  document.location.reload(true);
};


salvar = () => {
  let nota = document.getElementById("notes").value;
  const titulo = document.getElementById("titulo").value;


  localStorage.setItem(titulo, nota);

  txtSave = document.querySelector("p#restxt");
  txtSave.style.display = "none";
  txtSave.style.background = "#bdd39d";
  txtSave.innerHTML = "Conteudo salvo";

  txtSave.style.display = "block";

  setTimeout(() => {
    document.location.reload(true);
  }, 1000);
};

apaga = () => {
  const nota = document.getElementById("notes").value;
  const titulo = document.getElementById("titulo").value;

  localStorage.removeItem(titulo, nota);

  txtSave = document.querySelector("p#restxt");
  txtSave.style.display = "block";
  txtSave.style.background = "#eea0a0";
  txtSave.innerHTML = "Conteudo apagado";

  setTimeout(() => {
    console.log((txtSave.style.display = "none"));
    document.location.reload(true);
  }, 2000);
};

backlist = (x) => {
  let rnota = document.getElementById("notes");
  let rtitulo = document.getElementById("titulo");

  rtitulo.innerHTML = localStorage.key(x);
  rnota.innerHTML = localStorage.getItem(localStorage.key(x));
};

onload = () => {
  lista = localStorage.length;

  for (let i = 0; i < lista; i++) {
    let name = localStorage.key(i);
    let onclick = document.createAttribute("onclick");
    let sclass = document.createAttribute("class");
    let btn = document.createElement("button");
    onclick.value = "backlist(" + i + ")";
    sclass.value = "btn2";
    btn.innerHTML = name;
    btn.setAttributeNode(sclass);
    btn.setAttributeNode(onclick);
    document.getElementById("minhaLista").appendChild(btn);
  }
};

copy = () => {
  var copyText = document.getElementById("notes");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);

  txtSave = document.querySelector("p#restxt");
  txtSave.style.display = "block";
  txtSave.style.background = "#c7d9e7";
  txtSave.innerHTML = "Conteudo Copiado";

  setTimeout(() => {
    txtSave.style.display = "none";
  }, 2000);
};

