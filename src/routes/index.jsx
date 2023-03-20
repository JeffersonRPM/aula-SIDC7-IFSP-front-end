import React from "react";
import { BrowserRouter as HashRouter, Route, Switch, Redirect } 
    from "react-router-dom";
import Layout from "../layout";

import Swall from "sweetalert2";

import Login from ".../pages/login";

import Painel from "../pages/painel";

//Verificar se o Usuáro esta autenticado
const isAuthenticad = ( ) => {
    if ("hash" in localStorage) {
        return true
    }else {
        Swall.fire(
            "Erro!",
            "Você não está logado, tente novamente.",
            "error"
        )
        return false
    }
};

// A fnção protege uma rota
const AuthenticateRoute = ({ component: Component, ...rest}) => (
    <Route 
        {...rest}
        render = {(props) =>
            isAuthenticad() ?
                (<Component {...props} />) :
                (<Redirect to={{pathname: "/login"}} />)
        }
        />
    );

const Routes = (props) => {
    <HashRouter>
        <Switch>
            { /* Rotas que não necessitam de Auth */}
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Layout>
                { /* Rotas que precisam de Auth */}
                <AuthenticateRoute exact path="/painel" component={Painel} />
            </Layout>
        </Switch>
    </HashRouter>
};

export default Routes;