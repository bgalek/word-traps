import React from "react";

interface WordProps {
    content: string
}

const style = {
    textTransform: 'uppercase' as 'uppercase',
    fontSize: '10vw'
}

function Word({ content }: WordProps) {
    return (
        <h1 style={style}>{content}</h1>
    );
}

export default Word;