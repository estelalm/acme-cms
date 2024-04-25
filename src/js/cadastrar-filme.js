

import { postFilme, getGeneros, getPaises } from "../../api/endpoints.js"


const botaoCadastrar = document.getElementById('cadastrar')
const botaoAddGenero = document.getElementById('add-genero')
let generosInput = document.getElementById('generos')

const criarFilme = async () =>{

    let titulo = document.getElementById('titulo')
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
    let generos = getGenerosEscolhidos()


    if(titulo.value === "" || titulo.value === undefined || generosInput.value === "" || generosInput.value === undefined ||
    dataLancamento.value === "" || dataLancamento.value === undefined || duracao.value === "" || duracao.value === undefined ||
    precoInput.value === "" || precoInput.value === undefined || sinopse.value === "" || sinopse.value === undefined ||
    elenco.value === "" || elenco.value === undefined || diretor.value === "" || diretor.value === undefined ||
    produtoras.value === "" || produtoras.value === undefined || capa.value === "" || capa.value === undefined ||
    trailer.value === "" || trailer.value === undefined || classificacao == undefined){

        alert('Preencha todos os campos marcados com asterisco')
    }else{

        let preco
        if (precoInput.value.includes(',')) { preco = precoInput.value.replace(',', '.') }
        else { preco = precoInput.value }
        const dataFilme = dataLancamento.value.split('/').reverse().join('-')


        let novoFilme = {
            "nome": titulo.value,
            "sinopse": sinopse.value,
            "duracao": duracao.value,
            "data_lancamento": dataFilme,
            "data_relancamento": dataRelancamento,
            "valor_unitario": preco,
            "foto_capa": foto_capa,
            "trailer":trailer,
            "classificacao": classificacao,
            "pais_origem": [3],
                "generos": generos,
                "elenco": [1,6],
                "diretor": [1],
                "produtora": [2,3]
        }
    
       await postFilme(novoFilme)

    }
}
const getGenerosEscolhidos = () =>{
    let generosSelect = generosInput.querySelectorAll('select')
    let generosArray = []

    generosSelect.forEach(select =>{
        let options = select.querySelectorAll('option')
        options.forEach(genero =>{
            if(genero.value != ""){
                if(genero.selected){
                generosArray.push(Number(genero.value))
            }
        }
        })
    })
    
    return generosArray
}

const criarSelectGeneros = async () =>{

    const generos = await getGeneros()

    const generoSelect = document.createElement('select')
    generoSelect.classList.add('bg-violet-300', 'h-[90%]', 'outline-none')

    let placeholderOption = document.createElement('option')
    placeholderOption.textContent = "-Escolha o gênero-"
    generoSelect.appendChild(placeholderOption)

    generos.forEach(genero =>{
        let option = document.createElement('option')
        option.value = genero.id
        option.textContent = genero.nome

        generoSelect.appendChild(option)
    })

    generosInput.appendChild(generoSelect)

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
    let paisId
    paisSelect.forEach(pais =>{
            if(pais.selected){
                paisId = Number(pais.value)
            }
    })
    
    return paisId
}

botaoCadastrar.addEventListener('click', criarFilme)
botaoAddGenero.addEventListener('click', criarSelectGeneros)

preencherSelectPais()