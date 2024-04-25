
export async function getFilmes (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function getFilmeId (id){

const url = `http://localhost:8080/v2/AcmeFilmes/filme/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filme
}

export async function postFilme (filme) {
    const url = 'http://localhost:8080/v2/AcmeFilmes/filme'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(filme)
    }

    const response = await fetch(url, options)

    console.log(response)
    return response.ok
}

export async function deleteFilme (id) {

    const url = `http://localhost:8080/v2/AcmeFilmes/filme/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateFilme (id, filme) {

    console.log (id, filme)
    const url = `http://localhost:8080/v2/AcmeFilmes/filme/${id}`
    const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filme)
    }

    const response = await fetch(url, options)
    return response.json()
}

//atores

export async function getAtores (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/atores'
    const response = await fetch(url)
    const data = await response.json()

    return data.atores
}


export async function getAtorId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data.ator
}

export async function postAtor (ator) {
    const url = 'http://localhost:8080/v2/AcmeFilmes/ator'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(ator)
    }

    const response = await fetch(url, options)

    console.log(response.json())
    return response.ok
}

export async function deleteAtor (id) {

    const url = `http://localhost:8080/v2/AcmeFilmes/ator/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateAtor (id, ator) {

    console.log (id, ator)
    const url = `http://localhost:8080/v2/AcmeFilmes/ator/${id}`
    const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ator)
    }

    const response = await fetch(url, options)
    console.log(response.json())
    return response.json()
}

//diretores

export async function getDiretores (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/diretores'
    const response = await fetch(url)
    const data = await response.json()

    return data.diretores
}


export async function getDiretorId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/diretor/${id}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data.diretor
}

export async function postDiretor (diretor) {
    const url = 'http://localhost:8080/v2/AcmeFilmes/diretor'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(diretor)
    }

    const response = await fetch(url, options)

    console.log(response.json())
    return response.ok
}

export async function deleteDiretor (id) {

    const url = `http://localhost:8080/v2/AcmeFilmes/diretor/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateDiretor (id, diretor) {

    console.log (id, diretor)
    const url = `http://localhost:8080/v2/AcmeFilmes/diretor/${id}`
    const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(diretor)
    }

    const response = await fetch(url, options)
    console.log(response.json())
    return response.json()
}

//produtoras

export async function getProdutoras (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/produtoras'
    const response = await fetch(url)
    const data = await response.json()

    return data.produtoras
}


export async function getProdutoraId (id){

    const url = `http://localhost:8080/v2/AcmeFilmes/produtora/${id}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data.produtora
}

export async function postProdutora (produtora) {
    const url = 'http://localhost:8080/v2/AcmeFilmes/produtora'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(produtora)
    }

    const response = await fetch(url, options)

    console.log(response.json())
    return response.ok
}

export async function deleteProdutora (id) {

    const url = `http://localhost:8080/v2/AcmeFilmes/produtora/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateProdutora (id, produtora) {

    console.log (id, produtora)
    const url = `http://localhost:8080/v2/AcmeFilmes/produtora/${id}`
    const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtora)
    }

    const response = await fetch(url, options)
    console.log(response.json())
    return response.json()
}