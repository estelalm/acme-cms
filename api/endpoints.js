
export async function getFilmes (){

    const url = 'http://localhost:8080/v2/AcmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)

    return data.filmes
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

    const response = fetch(url, options)

    console.log(response)
    return response.ok
}
