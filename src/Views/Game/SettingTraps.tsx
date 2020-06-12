import React, { useState } from 'react';
import ColumnLayout from "../../Components/Layout/ColumnLayout";
import Word from "../../Components/Word/Word";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

interface TrapsProps {
    word: string;
    setTraps(traps: string[]): void;
}

const style = {
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column'
    }
}

function SettingTraps({ word, setTraps }: TrapsProps) {
    const [state, setState] = useState<string[]>([]);
    const [done, setDone] = useState<boolean>(false);
    const ready = state.length === 3 && state.indexOf('') === -1;
    return (
        <ColumnLayout>
            <p>to słowo dla drużyny przeciwnej</p>
            <Word content={word}/>
            <p>Zastawcie wasze pułapki!</p>
            <form noValidate autoComplete="off" style={style.form}>
                <TextField disabled={done} placeholder="wprowadź słowo" label="Pierwsza pułapka" margin="normal"
                           variant="outlined"
                           InputLabelProps={{ shrink: true }} onChange={(e) => handleChange(0, e.target.value)}/>
                <TextField disabled={done} placeholder="wprowadź słowo" label="Druga pułapka" margin="normal"
                           variant="outlined"
                           InputLabelProps={{ shrink: true }} onChange={(e) => handleChange(1, e.target.value)}/>
                <TextField disabled={done} placeholder="wprowadź słowo" label="Trzecia pułapka" margin="normal"
                           variant="outlined"
                           InputLabelProps={{ shrink: true }} onChange={(e) => handleChange(2, e.target.value)}/>
            </form>
            <Button disabled={!ready} color="primary" variant="contained" onClick={handleReady}>Gotowe!</Button>
            {done ? <p>oczekiwanie na przeciwników</p> : null}
        </ColumnLayout>
    );

    function handleReady() {
        setTraps(state);
        setDone(true);
    }

    function handleChange(index: number, trap: string) {
        setState(Object.assign([], state, { [index]: trap }));
    }
}

export default SettingTraps