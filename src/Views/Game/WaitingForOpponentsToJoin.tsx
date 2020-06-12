import React from 'react';
import ColumnLayout from "../../Components/Layout/ColumnLayout";
import Loader from "../../Components/Loader/Loader";

function WaitingForOpponentsToJoin({ gameId }: { gameId: string }) {
    return <ColumnLayout>
        <Loader title="czekamy na drugą drużynę"/>
        <pre>
            <a href={`http://localhost:3000/game/${gameId}`}>http://localhost:3000/game/{gameId}</a>
        </pre>
    </ColumnLayout>;
}

export default WaitingForOpponentsToJoin
