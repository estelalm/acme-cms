import { getDiretorId, updateDiretor, getPaises } from "../../api/endpoints.js";


const diretorId = Number(localStorage.getItem('idDiretor'))
const isEditing = localStorage.getItem('isEditing')

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
const paisSelect = document.getElementById('pais-select')
const nacionalidadeText = document.getElementById('nacionalidade-text')
let biografia = document.getElementById('biografia')
let foto = document.getElementById('foto')


inputs.forEach(input => {
    input.disabled = true
})

textAreas.forEach(textArea => {
    textArea.disabled = true
})
///////////////////////////////////////

const modoEditar = () => {

    body[0].classList.toggle('edit-mode')
    paisSelect.classList.toggle('hidden')
    nacionalidadeText.classList.toggle('hidden')

    const botaoCancelar = document.getElementById('exit')

    const botaoSpan = botaoEditar.querySelector('span')

    if (body[0].classList.contains('edit-mode')) {
        botaoSpan.textContent = 'Salvar alterações'
    } else {
        botaoSpan.textContent = 'Editar Diretor'
    }

    inputs.forEach(input => {
        if (body[0].classList.contains('edit-mode'))
            input.disabled = false
        else
            input.disabled = true
    })

    textAreas.forEach(textArea => {
        if (body[0].classList.contains('edit-mode'))
            textArea.disabled = false
        else
            textArea.disabled = true
    })


        if(!body[0].classList.contains('edit-mode')){


        let dataNascimentoDiretor = dataNascimento.value.split('/').reverse().join('-')
        let dataFalecimentoDiretor
        if (dataFalecimento.value == "" || dataFalecimento.value == undefined || dataFalecimento.value == '--') {
            dataFalecimentoDiretor = null
        } else {
            dataFalecimentoDiretor = dataFalecimento.value.split('/').reverse().join('-')
        }

        const diretorAtualizado = {
            "id": diretorId,
            "nome": nome.value,
            "nome_artistico": nomeArtistico.value,
            "data_nascimento": dataNascimentoDiretor,
            "data_falecimento": dataFalecimentoDiretor,
            "biografia": biografia.value,
            "foto": foto.value,
            "nacionalidade": getPaisEscolhido()
        }

        updateDiretor(diretorId, diretorAtualizado)

        window.location.reload()
    }
}

botaoEditar.addEventListener('click', modoEditar)

const preencherSelectPais = async (nacionalidadeArray) => {

    const paises = await getPaises()

    paises.forEach(pais => {
        const option = document.createElement('option')
        option.value = pais.id
        option.textContent = pais.gentilico


        if(nacionalidadeArray[0] == option.value){
            console.log(nacionalidadeArray[0], option.textContent)
            option.selected = true
        }

        paisSelect.appendChild(option)
    })
}
const getPaisEscolhido = () => {
    const paisSelect = document.getElementById('pais-select')
    const paises = paisSelect.querySelectorAll('option')
    let paisId
    paises.forEach(pais => {
        if (pais.selected) {
            paisId = Number(pais.value)
        }
    })

    return [paisId]
}

////////////////////////////////////////////////

const preencherInfoDiretor = (diretor) => {

    //nome do diretor
    nome.value = diretor.nome
    //nome artistico do diretor
    nomeArtistico.value = diretor.nome_artistico

    // data nascimento
    const dataSplit = diretor.data_nascimento.split('T')
    const dataNascimentoDiretor = dataSplit[0].split('-').reverse().join('/')
    dataNascimento.value = dataNascimentoDiretor

    //data falecimento
    if (diretor.data_falecimento == null) {
        dataFalecimento.value = ""
    } else {
        const falecimentoSplit = diretor.data_falecimento.split('T')
        const falecimentoDiretor = falecimentoSplit[0].split('-').reverse().join('/')
        dataFalecimento.value = falecimentoDiretor
    }

    //nacionalidade
    const nacionalidadeArray = []
    diretor.nacionalidade.forEach(nacionalidadeDiretor => nacionalidadeArray.push(nacionalidadeDiretor.gentilico))
    nacionalidadeText.textContent = String(nacionalidadeArray.join(' / '))
    nacionalidade.appendChild(nacionalidadeText)

    biografia.value = diretor.biografia

    let fotoDisplay = document.getElementById('fotoDisplay')
    fotoDisplay.classList.add(`bg-[url('${diretor.foto}')]`)
    foto.value = diretor.foto

    preencherSelectPais(nacionalidadeArray)
}



const loadDiretor = async () => {
    const diretor = await getDiretorId(diretorId)
    preencherInfoDiretor(diretor[0])
}

loadDiretor()