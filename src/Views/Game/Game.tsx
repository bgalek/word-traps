import React, { useState } from 'react';
import { GameState } from "./GameState";
import { useEffectOnce } from "react-use";
import firebase from "firebase";
import InitializedGame from "./InitializedGame";
import Loader from "../../Components/Loader/Loader";
import { RouteComponentProps } from "@reach/router";
import FullScreenLayout from "../../Components/Layout/FullScreenLayout";

const isEqual = require("react-fast-compare");

const firebaseConfig = {
  //INSERT FIREBASE CONFIG
};

const database = firebase.initializeApp(firebaseConfig).database();

function Game({ gameId }: GameProps) {
    if (!gameId) throw new Error("no game id");
    const [localGameState, setLocalGameState] = useState();
    useEffectOnce(() => {
        database.ref(`/game/${gameId}`).on('value', (snapshot: { val: () => GameState; }) => {
            const gameState: GameState = snapshot.val();
            if (isEqual(localGameState, gameState)) {
                console.log('rerender skipped');
                return;
            }
            if (!gameState) {
                let newGameState = GameState.init();
                setGameState(gameId, newGameState)
                setLocalGameState({
                    ...newGameState,
                    teamsReady: false,
                    trapsReady: false,
                    playerReady: false,
                    preparationReady: false
                });
            } else {
                setLocalGameState({
                    ...gameState,
                    teamsReady: Object.keys(gameState.teams).length === 2,
                    trapsReady: GameState.getRequiredTrapsCount(gameState) === GameState.getSetTrapsCount(gameState),
                    playerReady: false,
                    preparationReady: false
                });
            }
        });
    })
    if (!localGameState) return <FullScreenLayout><Loader title="Ładowanie"/></FullScreenLayout>;
    if (!GameState.containsTeam(localGameState)) {
        localGameState.teams[GameState.getTeamId()] = GameState.initTeam();
        setGameState(gameId, localGameState);
        return <Loader title="joining game..."/>;
    }
    return <InitializedGame gameId={gameId} gameState={localGameState}
                            setGameState={(newGameState) => setGameState(gameId, newGameState)}/>;

    function setGameState(gameId: string, gameState: GameState) {
        database.ref(`/game/${gameId}`).set(gameState)
        setLocalGameState(gameState);
    }
}

interface GameProps extends RouteComponentProps {
    gameId?: string;
}

export default Game;
