 import { getFilmeId, updateFilme, getPaises } from "../../api/endpoints.js";

 const filmeId = Number(localStorage.getItem('idFilme')) 
 const isEditing =localStorage.getItem('isEditing')

const botaoEditar = document.getElementById('editar')
const body = document.getElementsByTagName("body")
const inputs = document.querySelectorAll('input')
const textAreas = document.querySelectorAll('textarea')
let nacionalidade = document.getElementById('nacionalidade')  
const paisSelect = document.getElementById('pais-select')
const nacionalidadeText = document.getElementById('nacionalidade-text')

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
        let dataFilme = inputs[2].value.split('/').reverse().join('-')
        let dataRelancamento
        if(inputs[3].value == "" || inputs[3].value == undefined || inputs[3].value == '--'){
            dataRelancamento = null
        }else{
            dataRelancamento = inputs[3].value.split('/').reverse().join('-')
        }
        console.log(getPaisEscolhido())

        const filmeAtualizado = {
            "nome": inputs[0].value,
            "sinopse": textAreas[0].value,
            "duracao": inputs[4].value,
            "data_lancamento": dataFilme,
            "data_relancamento": dataRelancamento,
            "valor_unitario": valorUnitario,
            "foto_capa": inputs[9].value,
            "classificacao": 1,
            "pais_origem": getPaisEscolhido()
        }

       updateFilme(filmeId, filmeAtualizado)
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
    inputs [1].value = generosFilme.join(' / ')

    // data lançamento
    const dataSplit = filme.data_lancamento.split('T')
    const dataFilme = dataSplit[0].split('-').reverse().join('/')
    inputs [2].value = dataFilme
    //data relançamento
    if(filme.data_relancamento == null){
        inputs [3].value = ""
    }else{
        const relancamentoSplit = filme.data_relancamento.split('T')
        const relancamentoFilme = relancamentoSplit[0].split('-').reverse().join('/')
        inputs [3].value = relancamentoFilme
    }

    //duração
    const duracaoCompleta = filme.duracao.split('T')
    const duracaoTempo = duracaoCompleta[1].split('.')
    const duracaoFilme = duracaoTempo[0]
    inputs[4].value = duracaoFilme

    //valor unitário
    inputs[5].value = `R$${filme.valor_unitario.toFixed(2)}`
    textAreas[0].value = filme.sinopse



    //classificação
    let classificacaoImg = document.getElementById('img-classificacao')
    classificacaoImg.src = `../img/${filme.classificacao[0].imagem}`
    classificacaoImg.alt = filme.classificacao[0].nome

    //país de origem
    nacionalidadeText.textContent = filme.pais_origem[0].nome


    //elenco
    const elencoFilme = []
    filme.elenco.forEach(ator => elencoFilme.push(ator.nome))
    textAreas[1].value = elencoFilme.join(', ')
    //diretor
    const diretoresFilme = []
    filme.diretor.forEach(diretor => diretoresFilme.push(diretor.nome))

    inputs[6].value = diretoresFilme.join(', ')
    //produtora
    const produtorasFilme = []
    filme.produtora.forEach(produtora => produtorasFilme.push(produtora.nome))
    inputs[7].value = produtorasFilme.join(', ')

    const capa = document.getElementById('capa')
    capa.classList.add(`bg-[url('${filme.foto_capa}')]`)
    inputs[9].value = filme.foto_capa
    inputs[10].value = filme.trailer


    preencherSelectPais(filme.pais_origem)
    
}



const loadFilme = async () =>{
    const filme = await getFilmeId(filmeId)
    preencherInfoFilme(filme[0])
}

loadFilme()