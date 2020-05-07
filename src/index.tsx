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
import { isUuid, uuid } from 'uuidv4';
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAB5xPgiX6lio_Ex_i1G5GWIrQqqqznlio",
    authDomain: "word-traps.firebaseapp.com",
    databaseURL: "https://word-traps.firebaseio.com",
    projectId: "word-traps",
    storageBucket: "word-traps.appspot.com",
    messagingSenderId: "1055810547251",
    appId: "1:1055810547251:web:6ae6b37606fb568b983d46"
};

const database = firebase.initializeApp(firebaseConfig).database();

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

function getTeamId() {
    const teamId = localStorage.getItem("teamId");
    if (teamId !== null && isUuid(teamId)) return teamId;
    const newTeamId = uuid();
    localStorage.setItem('teamId', newTeamId);
    return newTeamId;
}

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
            <Home path="/" default={true} database={database} teamId={getTeamId()}/>
            <Game path="/game/:gameId" teamId={getTeamId()} database={database}/>
        </Router>
    </ThemeProvider>,
    document.getElementById('root')
);
