import { getProdutoras, deleteProdutora } from "../../api/endpoints.js"; 


const criarInfoProdutora = (produtora) =>{

    const container = document.getElementById('container')

    const infoProdutora = document.createElement('div')
    infoProdutora.classList.add('grid', 'grid-cols-[5%_25%_50%_8%_5%]', 'p-6', 'px-8', 'gap-2', 'items-center')

    const idProdutora = document.createElement('span')
    idProdutora.textContent = produtora.id

    const nome = document.createElement('a')
    nome.classList.add('underline', 'title')
    nome.textContent = produtora.nome
    nome.href = './produtora.html'

    nome.addEventListener('click', () =>{
        let produtoraId = produtora.id
        localStorage.setItem('idProdutora', produtoraId)
    })


    const descricao = document.createElement('span')
    descricao.textContent = produtora.descricao


    const editImg = document.createElement('img')
    editImg.src = '../img/edit.png'
    const editar = document.createElement('a')
    editar.href ='./produtora.html'
    editar.classList.add('h-10', 'aspect-square', 'bg-gray-50', 'p-1', 'rounded-lg')
    editar.appendChild(editImg)

    editar.addEventListener('click', () =>{
        let produtoraId = produtora.id
        localStorage.setItem('idProdutora', produtoraId)
    })

    const deleteImg = document.createElement('img')
    deleteImg.src = '../img/deletar.png'
    const deletar = document.createElement('button')
    deletar.classList.add('h-10', 'aspect-square', 'bg-red-500', 'p-1', 'rounded-lg')
    deletar.appendChild(deleteImg)

    deletar.addEventListener('click', () =>{
        deleteProdutora(produtora.id)
        window.location.reload()
    })

    infoProdutora.replaceChildren(idProdutora, nome, descricao, editar, deletar)

    container.appendChild(infoProdutora)
}

const listarProdutoras = async () =>{

    const listaProdutoras = await getProdutoras()
     listaProdutoras.forEach(produtora =>{
        criarInfoProdutora(produtora)
     })

}

listarProdutoras()