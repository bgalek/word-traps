import React from 'react';
import ColumnLayout from "../../Components/Layout/ColumnLayout";

interface WaitingRoomProps {
    gameId: string;
}

function WaitingRoom({ gameId }: WaitingRoomProps) {
    return <ColumnLayout>
        <p>czekamy na drugą drużynę</p>
        <p>link: <a href={`http://localhost:3000/game/${gameId}`}>http://localhost:3000/game/{gameId}</a></p>
    </ColumnLayout>;
}

export default WaitingRoom
