import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav () {
    return (
        <ul>
            <li>
                <NavLink exact activeClassName="active'" to="/" />
            </li>
        </ul>
    )
}

export default Nav;