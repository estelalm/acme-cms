
const botaoEntrar = document.getElementById('botao-entrar')

const getAdmnistradores = async function () {

    try{
        const url = 'http://localhost:8080/v2/AcmeFilmes/admnistradores'
        const response = await fetch(url)
        const data = await response.json()
    
        console.log(data)
    
        return data.admnistradores
    }catch(error){
        console.log(error)
        return false
    }
}

const logar = async function () {

    
    let admnistradores = await getAdmnistradores()
    let loginValido = false

    let login = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    console.log(login, senha)
    admnistradores.forEach((admnistrador) => {

        let admnistradorEmail
        let admnistradorSenha

        if (admnistrador.login == login && senha == admnistrador.senha) {
            admnistradorEmail = admnistrador.login
            admnistradorSenha = admnistrador.senha
            let idAdmnistrador = admnistrador.id
            localStorage.setItem('idAdmnistrador', idAdmnistrador)
            loginValido = true
        } 
    })

    if(loginValido){
        window.location.assign('/src/pages/dashboard.html')
    }else{
        alert('Usuário ou senha incorretos')
    }
    
}

botaoEntrar.addEventListener('click', logar)















// {
//     "id": 1,
//     "nome": "admin",
//     "login": "admin@acmefilmes.com",
//     "senha": "adm123"
// }