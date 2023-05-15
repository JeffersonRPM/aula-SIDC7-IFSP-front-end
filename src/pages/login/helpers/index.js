const setSessionInStorage = (data) => {
    try {
        sessionStorage.setItem('id_usuario', data.usuario.id_usuario)
        sessionStorage.setItem('nome', data.usuario.nome)
        return true;
    } catch (error) {
        console.log('Erro ao armazenar session 1')
        return error
    }
}

const setLocalStorage = (data) => {
    try {
        localStorage.setItem('id_usuario', data.usuario.id_usuario)
        localStorage.setItem('nome', data.usuario.nome)
        localStorage.setItem('hash', 1)

        return true;
    } catch (error) {
        console.log('Erro ao armazenar session 2')
        return error
    }
}

export { setSessionInStorage, setLocalStorage} 