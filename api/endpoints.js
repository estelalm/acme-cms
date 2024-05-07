
export async function getFilmes (){

    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function getFilmeId (id){

const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/filme/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filme
}

export async function postFilme (filme) {
    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/filme'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(filme)
    }

    const response = await fetch(url, options)

    console.log(response.json())
    return response.ok
}

export async function deleteFilme (id) {

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/filme/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateFilme (id, filme) {

    console.log (id, filme)
    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/filme/${id}`
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

    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/atores'
    const response = await fetch(url)
    const data = await response.json()

    return data.atores
}


export async function getAtorId (id){

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/ator/${id}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data.ator
}

export async function postAtor (ator) {
    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/ator'
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

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/ator/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateAtor (id, ator) {

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/ator/${id}`
    const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ator)
    }

    const response = await fetch(url, options)
    
    return response.json()
}

//diretores

export async function getDiretores (){

    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/diretores'
    const response = await fetch(url)
    const data = await response.json()

    return data.diretores
}


export async function getDiretorId (id){

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/diretor/${id}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data.diretor
}

export async function postDiretor (diretor) {
    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/diretor'
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

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/diretor/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateDiretor (id, diretor) {

    console.log (id, diretor)
    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/diretor/${id}`
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

    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/produtoras'
    const response = await fetch(url)
    const data = await response.json()

    return data.produtoras
}


export async function getProdutoraId (id){

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/produtora/${id}`
        const response = await fetch(url)
        const data = await response.json()
  
        return data.produtoras
}

export async function postProdutora (produtora) {
    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/produtoras'
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

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/produtora/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateProdutora (id, produtora) {

    console.log (id, produtora)
    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/produtora/${id}`
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

//generos

export async function getGeneros (){

    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/generos'
    const response = await fetch(url)
    const data = await response.json()

    return data.generos
}


export async function getGeneroId (id){

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/genero/${id}`
        const response = await fetch(url)
        const data = await response.json()
  
        return data.generos
}

export async function postGenero (genero) {
    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/generos'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(genero)
    }

    const response = await fetch(url, options)

    console.log(response.json())
    return response.ok
}

export async function deleteGenero (id) {

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/genero/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updateGenero (id, genero) {

    console.log (id, genero)
    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/genero/${id}`
    const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genero)
    }

    const response = await fetch(url, options)
    console.log(response.json())
    return response.json()
}

//países

export async function getPaises (){

    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/paises'
    const response = await fetch(url)
    const data = await response.json()

    return data.paises
}


export async function getPaisId (id){

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/pais/${id}`
        const response = await fetch(url)
        const data = await response.json()
  
        return data.paises
}

export async function postPais (pais) {
    const url = 'https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/paises'
    const options = {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(pais)
    }

    const response = await fetch(url, options)

    console.log(response.json())
    return response.ok
}

export async function deletePais (id) {

    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/pais/${id}`
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(url, options)
    console.log(response.json)

    return response.ok
}

export async function updatePais (id, pais) {

    console.log (id, pais)
    const url = `https://acme-back-end-ukc8.onrender.com/v2/AcmeFilmes/pais/${id}`
    const options = {
        method : 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pais)
    }

    const response = await fetch(url, options)
    console.log(response.json())
    return response.json()
}