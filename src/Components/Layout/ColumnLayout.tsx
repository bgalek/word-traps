import React, { FunctionComponent } from 'react';
import Container from "@material-ui/core/Container";

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as 'center',
}

const ColumnLayout: FunctionComponent = (props) => (
    <Container>
        <main style={style}>
            {props.children}
        </main>
    </Container>
);

export default ColumnLayout;
