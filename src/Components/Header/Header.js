import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { resetUser } from '../../redux/authReducer';
import accountIcon from './accountIcon.svg';
import './Header.css';

const Header = () => {

    const user = useSelector(state => state.authReducer.user);

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(resetUser());
        auth.signOut();
    }

    return (
        <header className='header'>
            <nav className='header__inner'>
                <ul className='header__nav'>
                    <li className='header__item'>
                        <NavLink to='/'>Catalog</NavLink>
                    </li>
                    <li className='header__item'>
                        <NavLink to='/About'>About</NavLink>
                    </li>
                </ul>
                <div className='header__auth'>
                    <div className='header__user'>
                        <img className='header__icon' src={accountIcon} />
                        <div className='header__fullname'>{user.fullname}</div>
                    </div>
                    <NavLink className='header__signout' to='#' onClick={logOut}>(Sign Out)</NavLink>
                </div>
            </nav>
        </header>
    )
}

export default Header;