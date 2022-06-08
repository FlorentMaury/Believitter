// Librairies
import React       from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function NavigationItem(props) {
    return (
        <li>
            <NavLink
                exact = {props.exact}
                to={props.to}
                >{props.children}
            </NavLink>
        </li>
    );
};