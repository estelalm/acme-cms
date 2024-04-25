import { getFilmes, deleteFilme } from "../../api/endpoints.js"; 


const criarInfoFilme = (filme) =>{

    const container = document.getElementById('container')

    const infoFilme = document.createElement('div')
    infoFilme.classList.add('grid', 'grid-cols-[5%_25%_10%_10%_20%_10%_8%_5%]', 'p-6', 'px-8', 'gap-2', 'items-center')

    const idFilme = document.createElement('span')
    idFilme.textContent = filme.id

    const titulo = document.createElement('a')
    titulo.classList.add('underline', 'title')
    titulo.textContent = filme.nome
    titulo.href = './filme.html'

    titulo.addEventListener('click', () =>{
        let filmId = filme.id
        localStorage.setItem('idFilme', filmId)
    })

    const dataLancamento = document.createElement('span')
    const dataSplit = filme.data_lancamento.split('T')
    const dataFilme = dataSplit[0].split('-').reverse().join('/')
    dataLancamento.textContent = dataFilme

    const preco = document.createElement('span')
    preco.textContent = `R$${filme.valor_unitario.toFixed(2)}`

    const generos = document.createElement('span')
    const generosFilme = []
    filme.generos.forEach(genero => generosFilme.push(genero.nome))
    generos.textContent = generosFilme.join(' / ')

    const checkDestaque = document.createElement('input')
    checkDestaque.type = 'checkbox'
    const destaqueDiv = document.createElement('div')
    destaqueDiv.classList.add('h-10', 'px-2')
    destaqueDiv.appendChild(checkDestaque)

    const editImg = document.createElement('img')
    editImg.src = '../img/edit.png'
    const editar = document.createElement('a')
    editar.href ='./filme.html'
    editar.classList.add('h-10', 'aspect-square', 'bg-gray-50', 'p-1', 'rounded-lg')
    editar.appendChild(editImg)

    editar.addEventListener('click', () =>{
        let filmId = filme.id
        localStorage.setItem('idFilme', filmId)
    })

    const deleteImg = document.createElement('img')
    deleteImg.src = '../img/deletar.png'
    const deletar = document.createElement('button')
    deletar.classList.add('h-10', 'aspect-square', 'bg-red-500', 'p-1', 'rounded-lg')
    deletar.appendChild(deleteImg)

    deletar.addEventListener('click', () =>{
        deleteFilme(filme.id)
        window.location.reload()
    })

    infoFilme.replaceChildren(idFilme, titulo, dataLancamento, preco, generos, destaqueDiv, editar, deletar)

    container.appendChild(infoFilme)
}

const listarFilmes = async () =>{

    const listaFilmes = await getFilmes()
     listaFilmes.forEach(filme =>{
        criarInfoFilme(filme)
     })

}

listarFilmes()