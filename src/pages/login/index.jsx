import React, { Component } from 'react';
import Api from '../../services/api';
import Swal from 'sweetalert2';
import { withRouter } from "react-router";
import { setLocalStorage } from './helpers';

import KeyboardEventHandler from 'react-keyboard-event-handler';

// Loading
import LoadingOverlay from 'react-loading-overlay';
import './index.css';
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            loading: false
        }
        this.authentication = this.authentication.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentDidMount(){
      var hashLogin = this.props.match.params.hash;
      var hashUsr = this.props.match.params.usuario;

      if ("hash" in localStorage && (hashLogin==undefined || hashLogin==null)){
        this.props.history.push("/painel");
      }

      if(hashLogin!=undefined && hashUsr!=undefined){
        this.setState({username: atob(hashUsr), password: hashLogin})
        var root = this;
        setTimeout(function(){
          root.authentication();
        }, 500);

      }

    }


    //Criar funcao para login 
    async authentication(){
        this.setState({loading: true});
        const { username, password } = this.state;
        await Api.post('login/index', {
            usuario: username,
            senha: password
        })
        .then(response => {
            if(response.data.status === true){
                const data = response.data;
                console.log(data);
                if (setLocalStorage(data) ){
                  this.setState({loading: false});
                  Api.defaults.headers['Authorization'] = 'Basic ' + data.usuario.id_usuario
                  this.props.history.push('/painel')
                }
            } else {
                this.setState({loading: false});
                Swal.fire(
                    'Erro!',
                    response.data.erro,
                    'error'
                )
            }
        })
        .catch(error => {
            this.setState({loading: false});
            Swal.fire(
                'Erro!',
                'Não foi possível fazer login, verifique seus dados e tente novamente!',
                'error'
            )
        })
    }

    _handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log('do validate');
      }
    }

    //armazenar estado no redux
    render() {
        return (
          <>           
              <div className="d-flex flex-column flex-root full-height">
                <div className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white full-lg" id="kt_login">
                  <div className="login-aside d-flex flex-row-auto px-lg-0 px-5 pb-sm-40 flex-grow-1" style={{height: '100%', minHeight: '100%', backgroundSize: 'cover', maxWidth: '50%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                  backgroundImage: 'url(img/entrada.jpg)'}}>
                  </div>
                  <div className=" login-area-scroll">
                    <LoadingOverlay active={this.state.loading} spinner text='Carregando...' >
                    <div className="d-flex flex-column-fluid flex-center mt-6 mt-lg-0 login-area-center">
                      <form className="form login-area-form" noValidate="novalidate" id="kt_login_signin_form">
                        <div className="mt-lg-10 pb-15">
                          <a href="index.html">
                            <center><img alt="Logo" src="img/logo.jpg" className="logo-sticky mb-15" style={{width: '200px', textAlign: 'center', margin: 'auto'}} /></center>
                          </a>
                          <h3 className="font-weight-bolder text-dark display5"><i className="icon-xl fas fa-lock" /> Painel Administrativo</h3>
                          <span className="text-muted font-size-h6">Gerencie de forma fácil e rápida.</span>
                        </div>
                        <div className="form-group">
                          <label className="font-size-h6 font-weight-bolder text-dark">Usuário</label>
                          <input value={this.state.username} onChange={(e)=> this.setState({username: e.target.value })} className="form-control form-control-solid h-auto py-5 px-6 rounded-lg" type="text" name="username" autoComplete="off" />
                        </div>
                        <div className="form-group">
                          <div className="d-flex justify-content-between mt-n5">
                            <label className="font-size-h6 font-weight-bolder text-dark pt-5">Senha</label>
                            {/* <a href="#" data-toggle="modal" data-target="#ModalEsqueci" className="text-primary font-size-6 font-weight-bolder text-hover-primary pt-6">Esqueci minha senha</a> */}
                          </div>
                          <input value={this.state.password} onKeyPress={(e) =>  {if(e.key==='Enter') {this.authentication()}}} onChange={(e)=> this.setState({password: e.target.value })} className="form-control form-control-solid h-auto py-5 px-6 rounded-lg" type="password" name="password" autoComplete="off" />
                        </div>
                        <div className="pb-lg-0 pb-10">
                          <button  onClick={this.authentication} type="button" id="kt_login_signin_submit" className="btn btn-primary btn-block font-weight-bolder btn-lg font-size-h4 px-8 py-4 my-3 mr-3">ACESSAR</button>
                        </div>
                      </form>                      
                    </div>
                    </LoadingOverlay>
                  </div>
                </div>
              </div>
            <div className="modal fade" id="ModalEsqueci" tabIndex={-1} role="dialog" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Esqueci minha senha</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <i aria-hidden="true" className="ki ki-close" />
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="font-size-h6">Enviaremos um link por e-mail com instruções para você redefinir sua senha.</p>
                    <div className="form-group mt-10">
                      <label className="font-size-h6 font-weight-bolder text-dark">Digite abaixo o seu Email</label>
                      <input className="form-control form-control-solid h-auto py-5 px-6 rounded-lg" type="text" name="username" autoComplete="off" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary font-weight-bold">Redefinir senha</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="ModalCadastro" tabIndex={-1} role="dialog" aria-hidden="true">
              <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Cadastrar Estabelecimento</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <i aria-hidden="true" className="ki ki-close" />
                </button>
                </div>
                <div className="modal-body">
                <p className="font-size-h6">Preencha os dados abaixo para que possamos entrar em contato e realizar o cadastro do seu estabelecimento no Aiboo.</p>
                <div className="form-group mt-10">
                  <label className="font-size-h6 font-weight-bolder text-dark">Seu Nome</label>
                  <input className="form-control form-control-solid h-auto py-5 px-6 rounded-lg" type="text" name="username" autoComplete="off" />
                </div>
                <div className="form-group mt-10">
                  <label className="font-size-h6 font-weight-bolder text-dark">Nome do Estabelecimento</label>
                  <input className="form-control form-control-solid h-auto py-5 px-6 rounded-lg" type="text" name="username" autoComplete="off" />
                </div>
                <div className="form-group mt-10">
                  <label className="font-size-h6 font-weight-bolder text-dark">Celular para Contato</label>
                  <input className="form-control form-control-solid h-auto py-5 px-6 rounded-lg" type="text" name="username" autoComplete="off" />
                </div>
                <div className="form-group mt-10">
                  <label className="font-size-h6 font-weight-bolder text-dark">Email</label>
                  <input className="form-control form-control-solid h-auto py-5 px-6 rounded-lg" type="text" name="username" autoComplete="off" />
                </div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-light-primary font-weight-bold" data-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary font-weight-bold">Solicitar cadastro</button>
                </div>
              </div>
              </div>
            </div>
          </>
        )
    }
}

export default withRouter(Login);