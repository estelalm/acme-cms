 import { getFilmeId, updateFilme, getPaises } from "../../api/endpoints.js";

 const filmeId = Number(localStorage.getItem('idFilme')) 
 const isEditing =localStorage.getItem('isEditing')

const botaoEditar = document.getElementById('editar')
const body = document.getElementsByTagName("body")
const inputs = document.querySelectorAll('input')
const textAreas = document.querySelectorAll('textarea')
const titulo = document.getElementById('titulo')
const trailer = document.getElementById('trailer')
const capa_filme = document.getElementById('capa')
const preco = document.getElementById('preco')
const duracao = document.getElementById('duracao')
const sinopse = document.getElementById('sinopse')
let nacionalidade = document.getElementById('nacionalidade')
const generos = document.getElementById('generos')
const elenco = document.getElementById('elenco')  
const diretor = document.getElementById('diretor')
const produtora = document.getElementById('produtora')
const lancamento = document.getElementById('lancamento')
const relancamento = document.getElementById('relancamento')
const paisSelect = document.getElementById('pais-select')
const nacionalidadeText = document.getElementById('nacionalidade-text')
const classificacaoContainer = document.getElementById('classificacao')
let classificacaoInput = document.querySelectorAll("input[type=radio]")
let classificacaoImg = document.getElementById('img-classificacao')

inputs.forEach(input =>{
    input.disabled = true
})
textAreas.forEach(textArea =>{
    textArea.disabled = true
})
///////////////////////////////////////

const modoEditar = () =>{

    body[0].classList.toggle('edit-mode')
    paisSelect.classList.toggle('hidden')
    nacionalidadeText.classList.toggle('hidden')
    classificacaoContainer.classList.toggle('hidden')
    classificacaoImg.classList.toggle('hidden')

    const botaoCancelar = document.getElementById('exit')
    // botaoCancelar.classList.toggle('hidden')
    // botaoCancelar.addEventListener('click', () =>{
    //     body[0].classList.remove('edit-mode')
    //     botaoCancelar.classList.add('hidden')
    // })
    
    const botaoSpan = botaoEditar.querySelector('span')

    if(body[0].classList.contains('edit-mode')){
        botaoSpan.textContent ='Salvar alterações'
    }else{
        botaoSpan.textContent ='Editar Filme'
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

        let valorUnitario = Number(inputs[5].value.replace('R$', ''))
        let dataFilme = lancamento.value.split('/').reverse().join('-')
        let dataRelancamento
        if(relancamento.value == "" || relancamento.value == undefined || relancamento.value == '--'){
            dataRelancamento = null
        }else{
            dataRelancamento = relancamento.value.split('/').reverse().join('-')
        }
        
        let classificacao
    classificacaoInput.forEach(input => {
        if (input.checked) {
            classificacao = input.value
        }
    })

    console.log(classificacao)

        const filmeAtualizado = {
            "nome": titulo.value,
            "sinopse": sinopse.value,
            "duracao": duracao.value,
            "data_lancamento": dataFilme,
            "data_relancamento": dataRelancamento,
            "valor_unitario": valorUnitario,
            "foto_capa": capa_filme.value,
            "trailer": trailer.value,
            "classificacao": classificacao,
            "pais_origem": getPaisEscolhido()
        }

       updateFilme(filmeId, filmeAtualizado)
    //    window.location.reload()
    }
}

botaoEditar.addEventListener('click', modoEditar)

const preencherSelectPais = async (nacionalidadeArray) => {

    const paises = await getPaises()

    paises.forEach(pais => {
        const option = document.createElement('option')
        option.value = pais.id
        option.textContent = pais.nome


        if(nacionalidadeArray[0].id == option.value){
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

    return paisId
}

////////////////////////////////////////////////

const preencherInfoFilme = (filme) =>{

    //nome do filme
    inputs[0].value = filme.nome
    //generos do filme
    const generosFilme = []
    filme.generos.forEach(genero => generosFilme.push(genero.nome))
    generos.innerHTML = `<span>${generosFilme.join(' / ')}</span>`

    // data lançamento
    const dataSplit = filme.data_lancamento.split('T')
    const dataFilme = dataSplit[0].split('-').reverse().join('/')
    lancamento.value = dataFilme
    //data relançamento
    if(filme.data_relancamento == null){
        relancamento.value = ""
    }else{
        const relancamentoSplit = filme.data_relancamento.split('T')
        const relancamentoFilme = relancamentoSplit[0].split('-').reverse().join('/')
        relancamento.value = relancamentoFilme
    }

    //duração
    const duracaoCompleta = filme.duracao.split('T')
    const duracaoTempo = duracaoCompleta[1].split('.')
    const duracaoFilme = duracaoTempo[0]
    duracao.value = duracaoFilme

    //valor unitário
    preco.value = `R$${filme.valor_unitario.toFixed(2)}`
    sinopse.value = filme.sinopse



    //classificação
    
    classificacaoImg.src = `../img/${filme.classificacao[0].imagem}`
    classificacaoImg.alt = filme.classificacao[0].nome

    //país de origem
    nacionalidadeText.textContent = filme.pais_origem[0].nome


    //elenco
    const elencoFilme = []
    filme.elenco.forEach(ator => elencoFilme.push(ator.nome))
    elenco.innerHTML = `<p>${elencoFilme.join(', ')}</p>` 
    //diretor
    const diretoresFilme = []
    filme.diretor.forEach(diretor => diretoresFilme.push(diretor.nome))

    diretor.innerHTML = `<p>${diretoresFilme.join(', ')}</p>` 
    //produtora
    const produtorasFilme = []
    filme.produtora.forEach(produtora => produtorasFilme.push(produtora.nome))
    produtora.innerHTML = `<p>${produtorasFilme.join(', ')}</p>` 

    const capa = document.getElementById('capa')
    capa.style.backgroundImage = `url('${filme.foto_capa}')`
    capa_filme.value = filme.foto_capa
    trailer.value = filme.trailer


    preencherSelectPais(filme.pais_origem)
    
}



const loadFilme = async () =>{
    const filme = await getFilmeId(filmeId)
    preencherInfoFilme(filme[0])
}

loadFilme()