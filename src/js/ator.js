import { getAtorId, updateAtor } from "../../api/endpoints.js";


const atorId = Number(localStorage.getItem('idAtor')) 
console.log(atorId)
const isEditing =localStorage.getItem('isEditing')

const botaoEditar = document.getElementById('editar')
const body = document.getElementsByTagName("body")
const textAreas = document.querySelectorAll('textarea')
let inputs = document.querySelectorAll('input')

let nome = document.getElementById('nome')
let nomeArtistico = document.getElementById('nome-artistico')
let dataNascimento = document.getElementById('nascimento')
let dataFalecimento = document.getElementById('falecimento')
let genero = document.getElementById('genero')
let nacionalidade = document.getElementById('nacionalidade')  
let biografia = document.getElementById('biografia')
let foto = document.getElementById('foto')

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
       botaoSpan.textContent ='Editar Ator'
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


       let dataNascimentoAtor = dataNascimento.value.split('/').reverse().join('-')
       let dataFalecimentoAtor
       if(dataFalecimento.value == "" || dataFalecimento.value == undefined || dataFalecimento.value == '--'){
           dataFalecimentoAtor = null
       }else{
        dataFalecimentoAtor = dataFalecimento.value.split('/').reverse().join('-')
       }

       const atorAtualizado =         {
            "id": atorId,
            "nome": nome.value,
            "nome_artistico": nomeArtistico.value,
            "data_nascimento": dataNascimentoAtor,
            "data_falecimento": dataFalecimentoAtor,
            "biografia": biografia.value,
            "foto": foto.value,
            "nacionalidade": [2, 4]
    }

      updateAtor(atorId, atorAtualizado)
   }
}

botaoEditar.addEventListener('click', modoEditar)

////////////////////////////////////////////////

const preencherInfoAtor = (ator) =>{

   //nome do ator
   nome.value = ator.nome
   //nome artistico do ator
   nomeArtistico.value = ator.nome_artistico

   // data nascimento
   const dataSplit = ator.data_nascimento.split('T')
   const dataNascimentoAtor = dataSplit[0].split('-').reverse().join('/')
   dataNascimento.value = dataNascimentoAtor

   //data falecimento
   if(ator.data_falecimento == null){
       dataFalecimento.value = ""
   }else{
       const falecimentoSplit = ator.data_falecimento.split('T')
       const falecimentoAtor = falecimentoSplit[0].split('-').reverse().join('/')
       dataFalecimento.value = falecimentoAtor
   }

   //nacionalidade
   const nacionalidadeArray = []
   ator.nacionalidade.forEach(nacionalidadeAtor => nacionalidadeArray.push(nacionalidadeAtor.gentilico))
   nacionalidade.value = nacionalidadeArray.join(' / ')

   biografia.value = ator.biografia

   let fotoDisplay = document.getElementById('fotoDisplay')
   fotoDisplay.classList.add(`bg-[url('${ator.foto}')]`)
   foto.value = ator.foto
   
}



const loadAtor = async () =>{
   const ator = await getAtorId(atorId)
   console.log(ator)
   preencherInfoAtor(ator[0])
}

loadAtor()