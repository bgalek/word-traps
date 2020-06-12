import React, { FunctionComponent, HTMLAttributes } from 'react';

interface AppLayoutProps extends React.PropsWithChildren<any> {
}

const defaultStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as 'center',
}

const FullScreenLayout: FunctionComponent<HTMLAttributes<HTMLElement>> = ({ children, className, style }) => {
    return (
        <main style={Object.assign({}, defaultStyle, style)} className={className}>
            {children}
        </main>
    );
}

export default FullScreenLayout;
