import React, { useState } from 'react';
import { RouteComponentProps } from "@reach/router";
import WaitingRoom from "./WaitingRoom";
import { useEffectOnce } from "react-use";
import SettingTraps from "./SettingTraps";
import Timer from "../Timer/Timer";

const initialState = {
    teamsReady: false,
    trapsReady: false,
    playerReady: false,
    preparationReady: false,
    teamWord: '',
    opponentsWord: ''
};

const trapsRequired = [0, 3, 4, 5, 6, 7];

function Game({ gameId, teamId, database }: GameProps) {
    const [state, setState] = useState<GameState>(initialState);
    useEffectOnce(() => {
        database.ref(`/game/${gameId}/teams/`).on('value', (snapshot: { val: () => any; }) => {
            const teams = snapshot.val();
            const currentTeam: TeamState = teams[teamId];
            // @ts-ignore how to fix thix? :(
            const opponentsTeam: TeamState = Object.entries(teams).find(key => key[0] !== teamId)[1];
            const trapsCount = Object.values<TeamState>(teams)
                .map(team => team.traps || [])
                .map(traps => traps.length)
                .reduce((a: number, b: number) => a + b);
            const requiredTraps = Object.values<TeamState>(teams)
                .map(team => team.level)
                .reduce((a, b) => trapsRequired[a] + trapsRequired[b])
            setState({
                teamWord: currentTeam.word,
                opponentsWord: opponentsTeam.word,
                trapsReady: trapsCount === requiredTraps,
                teamsReady: Object.keys(teams).length === 2,
                playerReady: false,
                preparationReady: false
            });
        });
    })

    if (!gameId || !teamId) return <p>error</p>;

    if (!state.teamsReady) {
        return <WaitingRoom gameId={gameId}/>
    }

    if (!state.trapsReady) {
        return <SettingTraps word={state.opponentsWord}
                             setTraps={traps => database.ref(`/game/${gameId}/teams/${teamId}/traps`).set(traps)}/>
    }

    if (!state.playerReady) {
        return <div>
            <p>podaj telefon graczowi zgadującemu</p>
            <button onClick={() => setState({ ...state, playerReady: true })}>ok</button>
        </div>;
    }

    if (state.playerReady) {
        if(!state.preparationReady){
            return <Timer timeout={3} title={state.opponentsWord} subtitle="⏳ przygotuj się!" onTimeout={() => setState({...state, preparationReady: true})}/>;
        }
        return <Timer timeout={30} title={state.opponentsWord} subtitle="🗣️ opowiadaj!" onTimeout={() => console.log('timeout!')}/>;
    }

    return <p>loading...</p>;
}

interface GameProps extends React.PropsWithChildren<any>, RouteComponentProps {
    gameId?: string;
    database: any;
}

interface GameState {
    teamsReady: boolean;
    trapsReady: boolean;
    playerReady: boolean;
    preparationReady: boolean;
    teamWord: string;
    opponentsWord: string;
}

interface TeamState {
    level: number;
    traps: string[];
    word: string;
}

export default Game;
