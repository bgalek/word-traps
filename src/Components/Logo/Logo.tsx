import logo from "./logo.svg";
import React from "react";

const style = {
    margin: 30,
    maxWidth: 500
}

export function Logo() {
    return <img style={style} alt="word-traps" src={logo}/>;
}