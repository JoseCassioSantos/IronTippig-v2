function save2() {
    var txnota = document.getElementById('txtnotas2')
    var notas = txnota.value

    if (typeof (Storage) !== "undefined") {
        localStorage.save2 = notas

        alert("Salvo!!!")

    } else {

        alert("Não suportado")
    }


}



function apaga2(){
    localStorage.removeItem('save2')
    var res = document.getElementById('txtnotas2')
    res.innerHTML= ''

}


onload = function () {

    var res = document.getElementById('txtnotas2')
    res.innerHTML = (localStorage.getItem('save2'))

}



function copy2() {
  
  var copyText = document.getElementById("txtnotas2");

  
  copyText.select();
  copyText.setSelectionRange(0, 99999); 


  navigator.clipboard.writeText(copyText.value);
  
  
}