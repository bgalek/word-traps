import React, { useState } from 'react';
import { Logo } from "../../Components/Logo/Logo";
import { RouteComponentProps, useNavigate } from "@reach/router";
import ColumnLayout from "../../Components/Layout/ColumnLayout";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

function Home(props: RouteComponentProps) {
    const navigate = useNavigate();
    const [gameId, setGameId] = useState<string>("");

    function handleClick() {
        window.navigator.vibrate(200);
        navigate(`/game/${gameId}`);
    }

    return (
        <ColumnLayout>
            <Logo/>
            <TextField placeholder="wprowadź nazwę gry" margin="normal" variant="outlined"
                       InputLabelProps={{ shrink: true }} onChange={(e) => setGameId(e.target.value)}/>
            <Button disabled={!gameId.length} color="primary" onClick={handleClick} variant="contained">Nowa
                Gra</Button>
        </ColumnLayout>
    );
}

export default Home;
