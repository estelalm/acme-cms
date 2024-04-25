

import { postFilme, getGeneros, getPaises, getAtores, getDiretores, getProdutoras } from "../../api/endpoints.js"


const botaoCadastrar = document.getElementById('cadastrar')
const botaoAddGenero = document.getElementById('add-genero')
const botaoAddAtor = document.getElementById('add-ator')
const botaoAddDiretor = document.getElementById('add-diretor')
const botaoAddProdutora = document.getElementById('add-produtora')
let generosInput = document.getElementById('generos')
let atoresInput = document.getElementById('elenco')
let diretorInput = document.getElementById('diretor')
let produtoraInput = document.getElementById('produtora')

const criarFilme = async () =>{

    let titulo = document.getElementById('titulo')
    let dataLancamento = document.getElementById('lancamento')
    let dataRelancamento = document.getElementById('relancamento')
    let duracao = document.getElementById('duracao')
    let precoInput = document.getElementById('preco')  
    let sinopse = document.getElementById('sinopse')
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
    let paisDeOrigem = getPaisEscolhido()
    let elenco = getAtoresEscolhidos()
    let diretor = getDiretorEscolhido()
    let produtoras = getProdutoraEscolhida()

    if(titulo.value === "" || titulo.value === undefined || generos.length <= 0 || generos === undefined ||
    dataLancamento.value === "" || dataLancamento.value === undefined || duracao.value === "" || duracao.value === undefined ||
    precoInput.value === "" || precoInput.value === undefined || sinopse.value === "" || sinopse.value === undefined ||
    elenco.length <= 0 || elenco === undefined || diretor.length <= 0  || diretor === undefined || diretor.length <= 0  || diretor === undefined ||
    produtoras.length <= 0 || produtoras === undefined || capa.value === "" || capa.value === undefined ||
    trailer.value === "" || trailer.value === undefined || classificacao == undefined){

        alert('Preencha todos os campos marcados com asterisco')
    }else{

        let preco
        if (precoInput.value.includes(',')) { preco = precoInput.value.replace(',', '.') }
        else { preco = precoInput.value }
        const dataFilme = dataLancamento.value.split('/').reverse().join('-')

        let dataRelancamentoFilme
        if(dataRelancamento.value != null && dataRelancamento.value != "" && dataRelancamento.value != " " && dataRelancamento.value != undefined){
            dataRelancamentoFilme = dataLancamento.value.split('/').reverse().join('-')
        }else{
            dataRelancamentoFilme = null
        }

        let novoFilme = {
            "nome": titulo.value,
            "sinopse": sinopse.value,
            "duracao": duracao.value,
            "data_lancamento": dataFilme,
            "data_relancamento": dataRelancamentoFilme,
            "valor_unitario": preco,
            "foto_capa": capa.value,
            "trailer":trailer.value,
            "classificacao": classificacao,
            "pais_origem": [paisDeOrigem],
                "generos": generos,
                "elenco": elenco,
                "diretor": diretor,
                "produtora": produtoras
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
            if(genero.value != "" && genero.value != undefined){
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
    const paises = paisSelect.querySelectorAll('option')
    let paisId
    paises.forEach(pais =>{
            if(pais.selected){
                paisId = Number(pais.value)
            }
    })
    
    return paisId
}

const getAtoresEscolhidos = () =>{
    let atoresSelect = atoresInput.querySelectorAll('select')
    let atoresArray = []

    atoresSelect.forEach(select =>{
        let options = select.querySelectorAll('option')
        options.forEach(ator =>{
            if(ator.value != ""  && ator.value != undefined){
                if(ator.selected){
                atoresArray.push(Number(ator.value))
            }
        }
        })
    })
    
    return atoresArray
}

const criarSelectAtores = async () =>{

    const atores = await getAtores()

    const atorSelect = document.createElement('select')
    atorSelect.classList.add('bg-violet-300', 'h-[90%]', 'w-[40%]', 'outline-none')

    let placeholderOption = document.createElement('option')
    placeholderOption.textContent = "-Escolha o ator-"
    atorSelect.appendChild(placeholderOption)

    atores.forEach(ator =>{
        let option = document.createElement('option')
        option.value = ator.id
        option.textContent = ator.nome

        atorSelect.appendChild(option)
    })

    atoresInput.appendChild(atorSelect)

}

const getDiretorEscolhido = () =>{
    let diretoresSelect = diretorInput.querySelectorAll('select')
    let diretoresArray = []

    diretoresSelect.forEach(select =>{
        let options = select.querySelectorAll('option')
        options.forEach(diretor =>{
            if(diretor.value != ""  && diretor.value != undefined){
                if(diretor.selected){
                    diretoresArray.push(Number(diretor.value))
            }
        }
        })
    })
    
    return diretoresArray
}

const criarSelectDiretor = async () =>{

    const diretores = await getDiretores()

    const diretorSelect = document.createElement('select')
    diretorSelect.classList.add('bg-violet-300', 'h-[90%]', 'w-[40%]', 'outline-none')

    let placeholderOption = document.createElement('option')
    placeholderOption.textContent = "-Escolha o diretor-"
    diretorSelect.appendChild(placeholderOption)

    diretores.forEach(diretor =>{
        let option = document.createElement('option')
        option.value = diretor.id
        option.textContent = diretor.nome

        diretorSelect.appendChild(option)
    })

    diretorInput.appendChild(diretorSelect)

}

const getProdutoraEscolhida = () =>{
    let produtorasSelect = produtoraInput.querySelectorAll('select')
    let produtorasArray = []

    produtorasSelect.forEach(select =>{
        let options = select.querySelectorAll('option')
        options.forEach(produtora =>{
            if(produtora.value != ""  && produtora.value != undefined){
                if(produtora.selected){
                    produtorasArray.push(Number(produtora.value))
            }
        }
        })
    })
    
    return produtorasArray
}

const criarSelectProdutora = async () =>{

    const produtoras = await getProdutoras()

    const produtoraSelect = document.createElement('select')
    produtoraSelect.classList.add('bg-violet-300', 'h-[90%]', 'w-[40%]', 'outline-none')

    let placeholderOption = document.createElement('option')
    placeholderOption.textContent = "-Escolha a produtora-"
    produtoraSelect.appendChild(placeholderOption)

    produtoras.forEach(produtora =>{
        let option = document.createElement('option')
        option.value = produtora.id
        option.textContent = produtora.nome

        produtoraSelect.appendChild(option)
    })

    produtoraInput.appendChild(produtoraSelect)

}

botaoCadastrar.addEventListener('click', criarFilme)
botaoAddGenero.addEventListener('click', criarSelectGeneros)
botaoAddAtor.addEventListener('click', criarSelectAtores)
botaoAddDiretor.addEventListener('click', criarSelectDiretor)
botaoAddProdutora.addEventListener('click', criarSelectProdutora)

preencherSelectPais()