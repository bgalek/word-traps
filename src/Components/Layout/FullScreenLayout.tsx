import React from 'react';

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

function FullScreenLayout(props: AppLayoutProps) {
    return (
        <main style={Object.assign({}, style, props.style)} className={props.className}>
            {props.children}
        </main>
    );
}

export default FullScreenLayout;
