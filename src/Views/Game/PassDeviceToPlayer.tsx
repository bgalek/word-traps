import React from 'react';
import Loader from "../../Components/Loader/Loader";
import FullScreenLayout from "../../Components/Layout/FullScreenLayout";
import { Button } from "@material-ui/core";

function PassDeviceToPlayer({ onConfirm }: { onConfirm: () => void }) {
    return <FullScreenLayout>
        <Loader title="podaj telefon graczowi zgadującemu"/>
        <Button onClick={onConfirm} variant="contained" color="primary">Ok</Button>
    </FullScreenLayout>;
}

export default PassDeviceToPlayer
