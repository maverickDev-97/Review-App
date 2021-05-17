import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { setUser } from '../../redux/authReducer';
import './Auth.css';


const Auth = () => {

    const dispatch = useDispatch();

    const [pageStatus, setPageStatus] = useState('login');

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = ({ fullname, email, password }) => {
        (pageStatus == 'login') ?
            signIn(email, password)
            :
            signUp(fullname, email, password);
    }

    const signIn = (email, password) => {
        console.log(`Login ${email} ${password}`)
        auth.signInWithEmailAndPassword(email, password).then(userCredential => {
            dispatch(setUser({
                "fullname": userCredential.user.displayName,
                "email": userCredential.user.email,
                "id": userCredential.user.uid
            }))
        })
    }

    const signUp = (fullname, email, password) => {
        console.log(`Register ${fullname} ${email} ${password}`);
        auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
            userCredential.user.updateProfile({
                displayName: fullname
            }).then(() => {
                dispatch(setUser({
                    "fullname": userCredential.user.displayName,
                    "email": userCredential.user.email,
                    "id": userCredential.user.uid
                }))
            })
        })
    }

    const pageHeading = (pageStatus == 'login') ? 'Sign In' : 'Sign Up';
    const buttonText = (pageStatus == 'login') ? 'Sign In' : 'Sign Up';
    const pageLink = (pageStatus == 'login') ? 'register' : 'login';
    const pageLinkText = (pageStatus == 'login') ? 'Need an account?' : 'Already have an account?';

    return (
        <div className='auth'>
            <h1 className='auth__heading'>{pageHeading}</h1>
            <NavLink className='auth__link' onClick={() => { setPageStatus(pageLink) }} to='#'>{pageLinkText}</NavLink>
            <form className='auth__form' onSubmit={handleSubmit(onSubmit)}>
                {pageStatus == 'register' && <input className='auth__input' type='text' name='fullname' placeholder='Fullname' {...register('fullname')} />}
                <input className='auth__input' type='email' name='email' placeholder='Email' {...register('email')} />
                <input className='auth__input' type='password' name='password' placeholder='Password' {...register('password')} />
                <button className='auth__button'>{buttonText}</button>
            </form>
        </div>
    )
}

export default Auth;