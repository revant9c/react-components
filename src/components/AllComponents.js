import React from 'react';
import {Link} from 'react-router-dom';

function AllComponents () {
    return (
        <div>
            <h1>List of all reusable components</h1>
            <ul>
                <li>
                    <Link to='/excel'>
                        Excel Table
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AllComponents;