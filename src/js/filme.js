 import { getFilmeId, updateFilme } from "../../api/endpoints.js";

 const filmeId = Number(localStorage.getItem('idFilme')) 
 const isEditing =localStorage.getItem('isEditing')

const botaoEditar = document.getElementById('editar')
const body = document.getElementsByTagName("body")
const inputs = document.querySelectorAll('input')
const textAreas = document.querySelectorAll('textarea')

inputs.forEach(input =>{
    input.disabled = true
})
textAreas.forEach(textArea =>{
    textArea.disabled = true
})
///////////////////////////////////////

const modoEditar = () =>{

    body[0].classList.toggle('edit-mode')
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

        const filmeAtualizado = {
            "nome": inputs[0].value,
            "sinopse": textAreas[0].value,
            "duracao": inputs[4].value,
            "data_lancamento": dataFilme,
            "data_relancamento": dataRelancamento,
            "valor_unitario": valorUnitario,
            "foto_capa": inputs[9].value,
            "classificacao": 0,
            "pais_origem_id": 0
        }

       updateFilme(filmeId, filmeAtualizado)
    }
}

botaoEditar.addEventListener('click', modoEditar)

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
    
}



const loadFilme = async () =>{
    const filme = await getFilmeId(filmeId)
    preencherInfoFilme(filme[0])
}

loadFilme()