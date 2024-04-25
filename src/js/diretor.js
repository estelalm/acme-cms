import { getDiretorId, updateDiretor } from "../../api/endpoints.js";


const diretorId = Number(localStorage.getItem('idDiretor')) 
console.log(diretorId)
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
       botaoSpan.textContent ='Editar Diretor'
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


       let dataNascimentoDiretor = dataNascimento.value.split('/').reverse().join('-')
       let dataFalecimentoDiretor
       if(dataFalecimento.value == "" || dataFalecimento.value == undefined || dataFalecimento.value == '--'){
           dataFalecimentoDiretor = null
       }else{
        dataFalecimentoDiretor = dataFalecimento.value.split('/').reverse().join('-')
       }

       const diretorAtualizado =         {
            "id": diretorId,
            "nome": nome.value,
            "nome_artistico": nomeArtistico.value,
            "data_nascimento": dataNascimentoDiretor,
            "data_falecimento": dataFalecimentoDiretor,
            "biografia": biografia.value,
            "foto": foto.value,
            "nacionalidade": [2, 4]
    }

      updateDiretor(diretorId, diretorAtualizado)
   }
}

botaoEditar.addEventListener('click', modoEditar)

////////////////////////////////////////////////

const preencherInfoDiretor = (diretor) =>{

   //nome do diretor
   nome.value = diretor.nome
   //nome artistico do diretor
   nomeArtistico.value = diretor.nome_artistico

   // data nascimento
   const dataSplit = diretor.data_nascimento.split('T')
   const dataNascimentoDiretor = dataSplit[0].split('-').reverse().join('/')
   dataNascimento.value = dataNascimentoDiretor

   //data falecimento
   if(diretor.data_falecimento == null){
       dataFalecimento.value = ""
   }else{
       const falecimentoSplit = diretor.data_falecimento.split('T')
       const falecimentoDiretor = falecimentoSplit[0].split('-').reverse().join('/')
       dataFalecimento.value = falecimentoDiretor
   }

   //nacionalidade
   const nacionalidadeArray = []
   diretor.nacionalidade.forEach(nacionalidadeDiretor => nacionalidadeArray.push(nacionalidadeDiretor.gentilico))
   nacionalidade.value = nacionalidadeArray.join(' / ')

   biografia.value = diretor.biografia

   let fotoDisplay = document.getElementById('fotoDisplay')
   fotoDisplay.classList.add(`bg-[url('${diretor.foto}')]`)
   foto.value = diretor.foto
   
}



const loadDiretor = async () =>{
   const diretor = await getDiretorId(diretorId)
   console.log(diretor)
   preencherInfoDiretor(diretor[0])
}

loadDiretor()