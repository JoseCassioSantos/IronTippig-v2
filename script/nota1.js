function save1() {
    var txnota = document.getElementById('txtnotas1')
    var notas = txnota.value

    if (typeof (Storage) !== "undefined") {
        localStorage.save1 = notas

        alert("Salvo!!!")

    } else {

        alert("Não suportado")
    }


}



function apaga1(){
    localStorage.removeItem('save1')
    var res = document.getElementById('txtnotas1')
    res.innerHTML= ''

}


onload = function () {

    var res = document.getElementById('txtnotas1')
    res.innerHTML = (localStorage.getItem('save1'))

}



function copy1() {
  
  var copyText = document.getElementById("txtnotas1");

  
  copyText.select();
  copyText.setSelectionRange(0, 99999); 


  navigator.clipboard.writeText(copyText.value);
  
  
}