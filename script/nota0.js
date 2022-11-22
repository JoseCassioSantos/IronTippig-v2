function salvar(){
    let txtnotas = document.getElementById('notes')
    let tituloN = document.getElementById('titulo')
  
    
     titulo = tituloN.value 
     nota = txtnotas.value 
    
    
     localStorage.setItem(titulo, nota)


    txtSave = document.querySelector("p#restxt")
    console.log(txtSave.style.display = "block")
    console.log(txtSave.style.background = "#bdd39d")
    console.log(txtSave.innerHTML = "Conteudo salvo")

    setTimeout(() =>{
      console.log(txtSave.style.display = "none")
    }, 3000);

    

     //alert('Salvo')

    
    
  }
  
  function apaga(){
    let txtnotas = document.getElementById('notes')
    let tituloN = document.getElementById('titulo')
  
    
     titulo = tituloN.value 
     nota = txtnotas.value 
     

        localStorage.removeItem(titulo, nota)
      
         
        txtSave = document.querySelector("p#restxt")
        console.log(txtSave.style.display = "block")
        console.log(txtSave.style.background = "#eea0a0")
        console.log(txtSave.innerHTML = "Conteudo apagado")
    
        setTimeout(() =>{
          console.log(txtSave.style.display = "none")
          document.location.reload(true)
        }, 2000);
    
        
        
        
      
    
     
    
  }



  
  
  function backlist(x){
    let rnota = document.getElementById('notes')
    let rtitulo = document.getElementById('titulo')
  
    rtitulo.innerHTML = localStorage.key(x)
    rnota.innerHTML = localStorage.getItem(localStorage.key(x))
  
    
    
  }
  
  onload= function() {
  
  
  
    lista = localStorage.length
  
    for(let i = 0; i < lista; i++ ){
  
      let name = localStorage.key(i)
      let onclick = document.createAttribute('onclick')
      let sclass = document.createAttribute('class')
      let btn = document.createElement('button')
      onclick.value ="backlist("+i+")"
      sclass.value = "btn2"
      btn.innerHTML = name
      btn.setAttributeNode(sclass)
      btn.setAttributeNode(onclick)
      document.getElementById('minhaLista').appendChild(btn)
     
    }
    
    
   
  }
  
  function copy() {
  
    var copyText = document.getElementById("notes");
  
    
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
  
  
    navigator.clipboard.writeText(copyText.value);

    txtSave = document.querySelector("p#restxt")
        console.log(txtSave.style.display = "block")
        console.log(txtSave.style.background = "#c7d9e7")
        console.log(txtSave.innerHTML = "Conteudo Copiado")
    
        setTimeout(() =>{
          console.log(txtSave.style.display = "none")
        }, 2000);
    
    
  }
  
  function novo(){
    let txtnotas = document.getElementById('notes')
    let tituloN = document.getElementById('titulo')
    titulo = tituloN.value 
     nota = txtnotas.value 
  
     document.location.reload(true)
  }
  