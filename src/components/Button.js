import React from 'react';

export const Types = {
    PRIMARY : 'primary',
    WARNING : 'warning'
};

function Button (props) {
    let text = props.text,
        disabled = props.disabled;

    return (
        <button>{text}</button>
    )
}

export default Button;