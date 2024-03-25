
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