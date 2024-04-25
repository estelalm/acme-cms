import { getAtores, deleteAtor } from "../../api/endpoints.js"; 


const criarInfoAtor = (ator) =>{

    const container = document.getElementById('container')

    const infoAtor = document.createElement('div')
    infoAtor.classList.add('grid', 'grid-cols-[5%_25%_10%_20%_20%_8%_5%]', 'p-6', 'px-8', 'gap-2', 'items-center')

    const idAtor = document.createElement('span')
    idAtor.textContent = ator.id

    const nome = document.createElement('a')
    nome.classList.add('underline', 'title')
    nome.textContent = ator.nome
    nome.href = './ator.html'

    nome.addEventListener('click', () =>{
        let atorId = ator.id
        localStorage.setItem('idAtor', atorId)
    })

    const nomeArtistico = document.createElement('span')
    nomeArtistico.textContent = ator.nome_artistico

    const dataNascimento = document.createElement('span')
    const dataSplit = ator.data_nascimento.split('T')
    const dataAtor = dataSplit[0].split('-').reverse().join('/')
    dataNascimento.textContent = dataAtor

    const nacionalidade = document.createElement('span')
    const nacionalidadeArray = []
    console.log(ator.nacionalidade)
    ator.nacionalidade.forEach(nacionalidadeAtor => nacionalidadeArray.push(nacionalidadeAtor.gentilico))
    nacionalidade.textContent = nacionalidadeArray.join(' / ')


    const editImg = document.createElement('img')
    editImg.src = '../img/edit.png'
    const editar = document.createElement('a')
    editar.href ='./ator.html'
    editar.classList.add('h-10', 'aspect-square', 'bg-gray-50', 'p-1', 'rounded-lg')
    editar.appendChild(editImg)

    editar.addEventListener('click', () =>{
        let atorId = ator.id
        localStorage.setItem('idAtor', atorId)
    })

    const deleteImg = document.createElement('img')
    deleteImg.src = '../img/deletar.png'
    const deletar = document.createElement('button')
    deletar.classList.add('h-10', 'aspect-square', 'bg-red-500', 'p-1', 'rounded-lg')
    deletar.appendChild(deleteImg)

    deletar.addEventListener('click', () =>{
        deleteAtor(ator.id)
        window.location.reload()
    })

    infoAtor.replaceChildren(idAtor, nome, nomeArtistico, dataNascimento, nacionalidade, editar, deletar)

    container.appendChild(infoAtor)
}

const listarAtores = async () =>{

    const listaAtors = await getAtores()
     listaAtors.forEach(ator =>{
        criarInfoAtor(ator)
     })

}

listarAtores()