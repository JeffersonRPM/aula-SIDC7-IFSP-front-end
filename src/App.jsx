import React from "react";
import Routes from "./routes";
import { useHistory } from "react-router-dom";

function App() {
    let history = useHistory();
    return <Routes />
}

export default App;