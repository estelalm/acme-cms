

import { postDiretor, getPaises } from "../../api/endpoints.js"


const botaoCadastrar = document.getElementById('cadastrar')


const criarDiretor = async () =>{

    let nome = document.getElementById('nome')
    let nomeArtistico = document.getElementById('nomeArtistico')
    let dataNascimento = document.getElementById('nascimento')
    let dataFalecimento = document.getElementById('falecimento')
    let genero = document.getElementById('genero')
    let nacionalidade = getPaisEscolhido()
    let biografia = document.getElementById('biografia')
    let foto = document.getElementById('foto')

    console.log(nome, nomeArtistico)
    if(nome.value === "" || nome.value === undefined || nomeArtistico.value === "" || nomeArtistico.value === undefined ||
    dataNascimento.value === "" || dataNascimento.value === undefined || genero.value === "" || genero.value === undefined ||
    nacionalidade.length <= 0 || nacionalidade === undefined || biografia.value === "" || biografia.value === undefined ||
    foto.value === "" || foto.value === undefined){
        alert('Preencha todos os campos marcados com asterisco')
    }else{
        
        let dataFalecimentoDiretor
        if(dataFalecimento.value != "" || dataFalecimento.value != " "){
            dataFalecimentoDiretor = dataFalecimento.value.replace(" ", "").split('/').reverse().join('-')
        }else{
            dataFalecimentoDiretor = null
        }
        const dataDiretor = dataNascimento.value.split('/').reverse().join('-')
        let novoDiretor = {
                "nome": nome.value,
                "nome_artistico": nomeArtistico.value,
                "data_nascimento": dataDiretor,
                "data_falecimento": dataFalecimentoDiretor,
                "nacionalidade": [nacionalidade],  
                "biografia": biografia.value,
                "foto": foto.value
        }
    
       await postDiretor(novoDiretor)

    }
}

const preencherSelectPais = async () =>{

    const paises = await getPaises()

    const paisSelect = document.getElementById('pais-select')
    paises.forEach(pais =>{
        const option = document.createElement('option')
        option.value = pais.id
        option.textContent = pais.nome

        paisSelect.appendChild(option)
    })
}

const getPaisEscolhido = () =>{
    const paisSelect = document.getElementById('pais-select')
    const paises = paisSelect.querySelectorAll('option')
    let paisId
    paises.forEach(pais =>{
            if(pais.selected){
                paisId = Number(pais.value)
            }
    })
    
    return paisId
}

preencherSelectPais()

botaoCadastrar.addEventListener('click', criarDiretor)
// postDiretor(novoDiretor)