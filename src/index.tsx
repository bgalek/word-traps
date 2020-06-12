import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Router } from "@reach/router";
import Home from "./Views/Home/Home";
import Game from "./Views/Game/Game";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
            <Home path="/word-traps/" default={true}/>
            <Game path="/word-traps/game/:gameId"/>
        </Router>
    </ThemeProvider>,
    document.getElementById('root')
);
