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
            "foto_capa": inputs[9].value,
            "valor_unitario": valorUnitario
        }

       updateFilme(filmeId, filmeAtualizado)
    }
}

botaoEditar.addEventListener('click', modoEditar)

////////////////////////////////////////////////

const preencherInfoFilme = (filme) =>{
    inputs[0].value = filme.nome
    inputs [1].value = 'Fantasia / Aventura'

    const dataSplit = filme.data_lancamento.split('T')
    const dataFilme = dataSplit[0].split('-').reverse().join('/')
    inputs [2].value = dataFilme
    inputs [3].value = '--'

    const duracaoCompleta = filme.duracao.split('T')
    const duracaoTempo = duracaoCompleta[1].split('.')
    const duracaoFilme = duracaoTempo[0]
    inputs[4].value = duracaoFilme

    inputs[5].value = `R$${filme.valor_unitario.toFixed(2)}`
    textAreas[0].value = filme.sinopse

    textAreas[1].value = 'N/a'
    inputs[6].value = 'N/a'
    inputs[7].value = 'N/a'

    const capa = document.getElementById('capa')
    capa.classList.add(`bg-[url('${filme.foto_capa}')]`)
    inputs[9].value = filme.foto_capa
    inputs[10].value = 'link'
    
}



const loadFilme = async () =>{
    const filme = await getFilmeId(filmeId)
    preencherInfoFilme(filme[0])
}

loadFilme()