import React from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import qs from 'qs'; //TODO Verificar real necessidade. isso é QueryString
import withReactContent from 'sweetalert2-react-content'

const SwalRC = withReactContent(Swal)
const Api = Axios.create({
  baseURL:"http://127.0.0.1/aula-SIDC7-IFSP-back-end/index.php", //LOCAL

  headers: {
     "content-type": "application/x-www-form-urlencoded", // content-type accept for CodeIgniter
     'Authorization' : 'Basic ' +  localStorage.getItem("hash") ? localStorage.getItem("hash") : 'null'
   },
   transformRequest: [
     function(data, headers) {
       // transform to QueryString before request
       return qs.stringify(data);
     }
   ]
 });

 Api.interceptors.response.use(
  response => {
    const statusCode = response.data.status
    // Verificando código se houver error
    if (!statusCode) {
      switch (response.data.code) {
        case 401:
          localStorage.clear();
          SwalRC.fire({
            type: 'error',
            title: response.data.erro,
            html: 'É necessário fazer o login novamente.',
            footer: (
              <a className="btn btn-primary btn-sm" href="index.html">
                Fazer Login
              </a>
            ),
            allowOutsideClick: false,
            showConfirmButton: false
          })

        break
        default:
          break
      }
    }
    return response
  },
  error => {
    if( error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false ) {
      return Promise.reject(error);
    }
        SwalRC.fire({
          type: 'error',
          title: 'Ops! Ocorreu um erro inesperado '+error?.response?.status+'!',
          html: 'Uma equipe altamente treinada já foi acionada para resolver o problema!',
          footer: (
            <>
            <button onClick={e=>{
              document.location.reload(true);
              }} class="btn btn-success">Tentar novamente</button>
            </>
            ),
          allowOutsideClick: false,
          showConfirmButton: false
        })
      return error;
  }
)
 
export default Api;