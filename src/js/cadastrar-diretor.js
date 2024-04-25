

import { postDiretor } from "../../api/endpoints.js"


const botaoCadastrar = document.getElementById('cadastrar')


const criarDiretor = async () =>{

    let nome = document.getElementById('nome')
    let nomeArtistico = document.getElementById('nomeArtistico')
    let dataNascimento = document.getElementById('nascimento')
    let dataFalecimento = document.getElementById('falecimento')
    let genero = document.getElementById('genero')
    let nacionalidade = document.getElementById('nacionalidade')  
    let biografia = document.getElementById('biografia')
    let foto = document.getElementById('foto')

    console.log(nome, nomeArtistico)
    if(nome.value === "" || nome.value === undefined || nomeArtistico.value === "" || nomeArtistico.value === undefined ||
    dataNascimento.value === "" || dataNascimento.value === undefined || genero.value === "" || genero.value === undefined ||
    nacionalidade.value === "" || nacionalidade.value === undefined || biografia.value === "" || biografia.value === undefined ||
    foto.value === "" || foto.value === undefined){
        alert('Preencha todos os campos marcados com asterisco')
    }else{
        
        const dataDiretor = dataNascimento.value.split('/').reverse().join('-')
        let novoDiretor = {
                "nome": nome.value,
                "nome_artistico": nomeArtistico.value,
                "data_nascimento": dataDiretor,
                "data_falecimento": dataFalecimento.value,
                "nacionalidade": [2],  //fazer o menu de nacionalidade
                "biografia": biografia.value,
                "foto": foto.value
        }
    
       await postDiretor(novoDiretor)

    }
}

botaoCadastrar.addEventListener('click', criarDiretor)
// postDiretor(novoDiretor)