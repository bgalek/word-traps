import React from 'react';
import Container from "@material-ui/core/Container";

interface AppLayoutProps extends React.PropsWithChildren<any> {
}

const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as 'center',
}

function ColumnLayout(props: AppLayoutProps) {
    return (
        <Container>
            <main style={style}>
                {props.children}
            </main>
        </Container>

    );
}

export default ColumnLayout;
