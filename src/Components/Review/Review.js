import React from 'react';
import { useSelector } from 'react-redux';
import './Review.css';
import delIcon from './x.svg';

const Review = ({ text, authorName, authorId, deleteReview }) => {

    const user = useSelector(state => state.authReducer.user);

    const reviewDelete = () => {
        deleteReview(text);
    }

    return (
        <div className='review'>
            <div className='review__top'>
                <div className='review__author'>{authorName}</div>
            </div>
            <div className='review__bottom'>
                <div className='review__text'>{text}</div>
                {(user.id == authorId) && 
                <div onClick={reviewDelete} className='review__delete'>
                    <img className='review__deleteIcon' src={delIcon} />
                    Delete
                </div>}
            </div>
        </div>
    )
}

export default Review;