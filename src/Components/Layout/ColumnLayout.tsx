import React, { FunctionComponent, HTMLAttributes } from 'react';
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

const ColumnLayout: FunctionComponent<HTMLAttributes<HTMLElement>> = ({ children }) => (
    <Container style={{ height: '100%' }}>
        <main style={style}>
            {children}
        </main>
    </Container>
);

export default ColumnLayout;
