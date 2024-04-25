

import { postFilme } from "../../api/endpoints.js"


const botaoCadastrar = document.getElementById('cadastrar')


const criarFilme = async () =>{

    let titulo = document.getElementById('titulo')
    let generos = document.getElementById('generos')
    let dataLancamento = document.getElementById('lancamento')
    let dataRelancamento = document.getElementById('relancamento')
    let duracao = document.getElementById('duracao')
    let precoInput = document.getElementById('preco')  
    let sinopse = document.getElementById('sinopse')
    let elenco = document.getElementById('elenco')
    let diretor = document.getElementById('diretor')
    let produtoras = document.getElementById('produtor')
    let capa = document.getElementById('capa')
    let trailer = document.getElementById('trailer')
    let classificacaoInput = document.querySelectorAll("input[type=radio]")
    let classificacao
    classificacaoInput.forEach(input => {
        if (input.checked) {
            classificacao = input.value
        }
    })


    if(titulo.value === "" || titulo.value === undefined || generos.value === "" || generos.value === undefined ||
    dataLancamento.value === "" || dataLancamento.value === undefined || duracao.value === "" || duracao.value === undefined ||
    precoInput.value === "" || precoInput.value === undefined || sinopse.value === "" || sinopse.value === undefined ||
    elenco.value === "" || elenco.value === undefined || diretor.value === "" || diretor.value === undefined ||
    produtoras.value === "" || produtoras.value === undefined || capa.value === "" || capa.value === undefined ||
    trailer.value === "" || trailer.value === undefined || classificacao == undefined){

        alert('Preencha todos os campos marcados com asterisco')
    }else{
        let preco
        if(precoInput.value.includes(',')){
            preco = precoInput.value.replace(',', '.')
        }else{
            preco = precoInput.value
        }
        const dataFilme = dataLancamento.value.split('/').reverse().join('-')
        let novoFilme = {
            "nome": titulo.value,
            "sinopse": sinopse.value,
            "duracao": duracao.value,
            "data_lancamento": dataFilme,
            "data_relancamento": dataRelancamento.value,
            "foto_capa": capa.value,
            "valor_unitario": Number(preco)
        }
    
       await postFilme(novoFilme)

    }
}

botaoCadastrar.addEventListener('click', criarFilme)
// postFilme(novoFilme)