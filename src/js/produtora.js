import { getProdutoraId, updateProdutora } from "../../api/endpoints.js";


const produtoraId = Number(localStorage.getItem('idProdutora')) 
console.log(produtoraId)
const isEditing =localStorage.getItem('isEditing')

const botaoEditar = document.getElementById('editar')
const body = document.getElementsByTagName("body")
const textAreas = document.querySelectorAll('textarea')
let inputs = document.querySelectorAll('input')

let nome = document.getElementById('nome')
let descricao = document.getElementById('descricao')
let logo = document.getElementById('logo')

inputs.forEach(input =>{
   input.disabled = true
})

textAreas.forEach(textArea =>{
   textArea.disabled = true
})
///////////////////////////////////////

const modoEditar = () =>{

   body[0].classList.toggle('edit-mode')
   const botaoCancelar = document.getElementById('exit')
   
   const botaoSpan = botaoEditar.querySelector('span')

   if(body[0].classList.contains('edit-mode')){
       botaoSpan.textContent ='Salvar alterações'
   }else{
       botaoSpan.textContent ='Editar Produtora'
   }

   inputs.forEach(input =>{
       if(body[0].classList.contains('edit-mode'))
       input.disabled = false
       else
       input.disabled = true
   })
   
   textAreas.forEach(textArea =>{
       if(body[0].classList.contains('edit-mode'))
       textArea.disabled = false
       else
       textArea.disabled = true
   })

   if(!body[0].classList.contains('edit-mode')){


       const produtoraAtualizado =         {
            "id": produtoraId,
            "nome": nome.value,
            "descricao": descricao.value
    }

      updateProdutora(produtoraId, produtoraAtualizado)
   }
}

botaoEditar.addEventListener('click', modoEditar)

////////////////////////////////////////////////

const preencherInfoProdutora = (produtora) =>{

   //nome da produtora
   nome.value = produtora.nome

   //descricao
   descricao.value = produtora.descricao

   //foto

   let fotoDisplay = document.getElementById('fotoDisplay')
//    fotoDisplay.classList.add(`bg-[url('${produtora.foto}')]`)
//    foto.value = produtora.foto
   
}



const loadProdutora = async () =>{
   const produtora = await getProdutoraId(produtoraId)

   preencherInfoProdutora(produtora[0])
}

loadProdutora()