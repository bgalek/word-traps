import React, { useState } from "react";
import { GameState } from "./GameState";
import SettingTraps from "./SettingTraps";
import Timer from "../Timer/Timer";
import PassDeviceToPlayer from "./PassDeviceToPlayer";
import WaitingForOpponents from "./WaitingForOpponents";
import WaitingForOpponentsToJoin from "./WaitingForOpponentsToJoin";

function InitializedGame({ gameId, gameState, setGameState }: InitializedGameProps) {
    const [preparation, setPreparation] = useState(false);

    if (!gameState.teamsReady) {
        return <WaitingForOpponentsToJoin gameId={gameId}/>
    }

    if (!gameState.trapsReady) {
        const opponentTeam = GameState.getOpponentTeam(gameState);
        return <SettingTraps word={opponentTeam.word} setTraps={traps => {
            gameState.teams[GameState.getTeamId()].traps = traps;
            setGameState(gameState);
        }}/>
    }

    if (!gameState.playerReady) {
        if (gameState.currentTeam === GameState.getTeamId()) {
            return <PassDeviceToPlayer onConfirm={() => setGameState({ ...gameState, playerReady: true })}/>;
        }
        return <WaitingForOpponents/>;
    }

    if (gameState.playerReady) {
        if (!preparation) {
            return <Timer key="preparation" timeout={3} title={GameState.getOpponentTeam(gameState).word}
                          subtitle="⏳ przygotuj się!"
                          onTimeout={() => setPreparation(true)}/>;
        }
        return <Timer key="playtime" timeout={30} title={GameState.getOpponentTeam(gameState).word}
                      subtitle="🗣️ opowiadaj!"
                      onTimeout={() => console.log('timeout!')}/>;
    }

    return <p>loading...</p>;
}

interface InitializedGameProps {
    gameId: string,
    setGameState: (gameState: GameState) => void;
    gameState: GameState
}

export default InitializedGame;