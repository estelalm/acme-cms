import { getDiretores, deleteDiretor } from "../../api/endpoints.js"; 


const criarInfoDiretor = (diretor) =>{

    const container = document.getElementById('container')

    const infoDiretor = document.createElement('div')
    infoDiretor.classList.add('grid', 'grid-cols-[5%_25%_10%_20%_20%_8%_5%]', 'p-6', 'px-8', 'gap-2', 'items-center')

    const idDiretor = document.createElement('span')
    idDiretor.textContent = diretor.id

    const nome = document.createElement('a')
    nome.classList.add('underline', 'title')
    nome.textContent = diretor.nome
    nome.href = './diretor.html'

    nome.addEventListener('click', () =>{
        let diretorId = diretor.id
        localStorage.setItem('idDiretor', diretorId)
    })

    const nomeArtistico = document.createElement('span')
    nomeArtistico.textContent = diretor.nome_artistico

    const dataNascimento = document.createElement('span')
    const dataSplit = diretor.data_nascimento.split('T')
    const dataDiretor = dataSplit[0].split('-').reverse().join('/')
    dataNascimento.textContent = dataDiretor

    const nacionalidade = document.createElement('span')
    const nacionalidadeArray = []
    console.log(diretor.nacionalidade)
    diretor.nacionalidade.forEach(nacionalidadeDiretor => nacionalidadeArray.push(nacionalidadeDiretor.gentilico))
    nacionalidade.textContent = nacionalidadeArray.join(' / ')


    const editImg = document.createElement('img')
    editImg.src = '../img/edit.png'
    const editar = document.createElement('a')
    editar.href ='./diretor.html'
    editar.classList.add('h-10', 'aspect-square', 'bg-gray-50', 'p-1', 'rounded-lg')
    editar.appendChild(editImg)

    editar.addEventListener('click', () =>{
        let diretorId = diretor.id
        localStorage.setItem('idDiretor', diretorId)
    })

    const deleteImg = document.createElement('img')
    deleteImg.src = '../img/deletar.png'
    const deletar = document.createElement('button')
    deletar.classList.add('h-10', 'aspect-square', 'bg-red-500', 'p-1', 'rounded-lg')
    deletar.appendChild(deleteImg)

    deletar.addEventListener('click', () =>{
        deleteDiretor(diretor.id)
        window.location.reload()
    })

    infoDiretor.replaceChildren(idDiretor, nome, nomeArtistico, dataNascimento, nacionalidade, editar, deletar)

    container.appendChild(infoDiretor)
}

const listarDiretores = async () =>{

    const listaDiretors = await getDiretores()
     listaDiretors.forEach(diretor =>{
        criarInfoDiretor(diretor)
     })

}

listarDiretores()