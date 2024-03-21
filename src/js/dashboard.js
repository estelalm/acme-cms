import { getFilmes } from "../../api/endpoints.js"; 


const criarInfoFilme = (filme) =>{

    console.log(filme)

}

const listarFilmes = async () =>{

    const filmes = await getFilmes()
     filmes.forEach(filme =>{
        criarInfoFilme(filme)
     })

}

listarFilmes()