import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader({ title }: { title?: string }) {
    return (
        <div>
            <CircularProgress size={64} style={{margin: 20}} color="secondary"/>
            {title ? <h1>{title}</h1> : ''}
        </div>
    );
}