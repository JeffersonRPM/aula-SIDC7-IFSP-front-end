import React from 'react';
import { BrowserRouter as HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from '../layout';

import Swal from 'sweetalert2';

import Login from '../pages/login';
import Painel from '../pages/painel';
import Categoria from '../pages/categoria';
import Usuario from '../pages/usuario';
import Produto from '../pages/produto';

// Verificar se o usuário está autenticado
const isAuthenticated = () => {
    if("hash" in localStorage){
        return true
    } else {
        Swal.fire(
            'Erro!',
            'Você não está logado, tente novamente.',
            'error'
        )
        setTimeout(() => { window.location.reload(); }, 3000);
        return false
    }
};

// A função abaixo é para proteger uma rota
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );

const Routes = (props) => (
    <HashRouter>
        <Switch>
            { /* Rotas de Login não necessitam de Auth */}
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/auth" component={Login}></Route>
            { /* ------------------------------------- */}
            <Layout>
                <AuthenticatedRoute exact path="/painel" component={Painel} />
                <AuthenticatedRoute exact path="/categoria" component={Categoria} />
                <AuthenticatedRoute exact path="/usuario" component={Usuario} />
                <AuthenticatedRoute exact path="/produto" component={Produto} />
            </Layout>
        </Switch>
    </HashRouter>
);

export default Routes;