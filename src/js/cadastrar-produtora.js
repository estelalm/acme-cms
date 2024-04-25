

import { postProdutora } from "../../api/endpoints.js"


const botaoCadastrar = document.getElementById('cadastrar')


const criarProdutora = async () =>{

    let nome = document.getElementById('nome')
    let descricao = document.getElementById('descricao')
    let logo = document.getElementById('logo')


    if(nome.value === "" || nome.value === undefined || descricao.value === "" || descricao.value === undefined ||
    logo.value === "" || logo.value === undefined){
        alert('Preencha todos os campos marcados com asterisco')
    }else{
        
        
        let novoProdutora = {
                "nome": nome.value,
                "descricao": descricao.value
        }
    
       await postProdutora(novoProdutora)

    }
}

botaoCadastrar.addEventListener('click', criarProdutora)
// postProdutora(novoProdutora)