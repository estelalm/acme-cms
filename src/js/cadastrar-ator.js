

import { postAtor, getPaises } from "../../api/endpoints.js"


const botaoCadastrar = document.getElementById('cadastrar')


const criarAtor = async () =>{

    let nome = document.getElementById('nome')
    let nomeArtistico = document.getElementById('nomeArtistico')
    let dataNascimento = document.getElementById('nascimento')
    let dataFalecimento = document.getElementById('falecimento')
    let genero = document.getElementById('genero')
    let nacionalidade = await getPaisEscolhido()
    let biografia = document.getElementById('biografia')
    let foto = document.getElementById('foto')

   
    if(nome.value === "" || nome.value === undefined || nomeArtistico.value === "" || nomeArtistico.value === undefined ||
    dataNascimento.value === "" || dataNascimento.value === undefined ||
    nacionalidade.length <= 0 || nacionalidade === undefined || biografia.value === "" || biografia.value === undefined ){


        alert('Preencha todos os campos marcados com asterisco')
    }else{
        
        let dataFalecimentoAtor
        if(dataFalecimento.value != "" || dataFalecimento.value != " "){
            dataFalecimentoAtor = dataFalecimento.value.replace(" ", "").split('/').reverse().join('-')
        }else{
            console.log(dataFalecimentoAtor)
            dataFalecimentoAtor = null
        }
        
        const dataAtor = dataNascimento.value.replace(" ", "").split('/').reverse().join('-')
        let novoAtor = {
                "nome": nome.value,
                "nome_artistico": nomeArtistico.value,
                "data_nascimento": dataAtor,
                "data_falecimento": null,
                "nacionalidade": nacionalidade,  
                "biografia": biografia.value,
                "foto": foto.value,
                "nacionalidade": [nacionalidade]
        }
    
       await postAtor(novoAtor)

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

botaoCadastrar.addEventListener('click', criarAtor)
// postAtor(novoAtor)