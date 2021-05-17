import React from 'react';
import { NavLink } from 'react-router-dom';
import ArrowLeft from './arrowLeft.svg';
import './ReturnButton.css';

const ReturnButton = ({path}) => {
    return(
        <NavLink to={path} className='returnButton'>
            <img className='returnButton__icon' src={ArrowLeft} />
            <div className='returnButton__text'>Return</div>
        </NavLink>
    )
}

export default ReturnButton;