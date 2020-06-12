import React from 'react';
import Loader from "../../Components/Loader/Loader";
import FullScreenLayout from "../../Components/Layout/FullScreenLayout";

function WaitingForOpponents() {
    return <FullScreenLayout>
        <Loader title="oczekiwanie na ruch drużyny przeciwnej..."/>
    </FullScreenLayout>;
}

export default WaitingForOpponents
