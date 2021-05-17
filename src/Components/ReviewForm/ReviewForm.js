import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({addReview}) => {

    const [reviewText, setReviewText] = useState('');

    const reviewAdd = () => {
        addReview(reviewText)
    }

    return (
        <div className='reviewForm'>
            <textarea className='reviewForm__input' type='text' placeholder='Введите текст отзыва' value={reviewText} onChange={(e) => { setReviewText(e.target.value) }} />
            <button className='reviewForm__add' onClick={reviewAdd}>Добавить отзыв</button>
        </div>
    )
}

export default ReviewForm;