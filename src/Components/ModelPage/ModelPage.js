import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { db } from '../../firebase';
import ReturnButton from '../ReturnButton/ReturnButton';
import Review from '../Review/Review';
import ReviewForm from '../ReviewForm/ReviewForm';
import './ModelPage.css';

const ModelPage = () => {

    const user = useSelector(state => state.authReducer.user);

    const brandName = useSelector(state => state.carReducer.selectedBrand);
    const modelName = useSelector(state => state.carReducer.selectedModel);

    const [brandData, setBrandData] = useState(null);
    const [modelData, setModelData] = useState(null);

    useEffect(() => {

        if (modelName) {
            db.collection('Brands').doc(brandName).onSnapshot(doc => {

                setBrandData(doc.data());

                let model = doc.data().models.find(elem => elem.modelName == modelName)
                setModelData(model);
            })
        } else {

        }

    }, [])

    const addReview = (reviewText) => {
        
        let newReview = {
            "time": new Date(),
            "text": reviewText,
            "authorName": user.fullname,
            "authorId": user.id
        }
        let newModels = [
            ...brandData.models
        ]
        newModels.map(elem => {
            if (elem.modelName == modelName) {
                elem.reviews = [newReview, ...elem.reviews]
            }
        })
        let newData = {
            ...brandData,
            models: newModels
        }
        db.collection('Brands').doc(brandName).update(newData);
    }

    const deleteReview = (text) => {
        let newModels = [...brandData.models]
        newModels.map(elem => {
            if (elem.modelName !== modelName) {
                return elem
            }
            elem.reviews = elem.reviews.filter(item => item.text !== text);
        })
        let newData = {
            ...brandData,
            models: newModels
        }
        db.collection('Brands').doc(brandName).update(newData);
    }

    return (
        <div>
            {(!modelName) ? <Redirect to='/' /> :
                <div>
                    <ReturnButton path='/models' />
                    <h1>{`${brandName} ${modelName}`}</h1>
                    {(!modelData) ?
                        <div>
                            Loading...
                        </div>
                        :
                        <div className='modelPage__inner'>
                            <ReviewForm addReview={addReview} />
                            <div>
                            {modelData.reviews.map(elem => <Review authorName={elem.authorName} authorId={elem.authorId} text={elem.text} deleteReview={deleteReview} />)}
                            </div>
                        </div>}
                    {/* <input type='text' placeholder='Введите текст отзыва' value={reviewText} onChange={(e) => { setReviewText(e.target.value) }} />
                    <button onClick={addReview}>Добавить отзыв</button> */}
                </div>
            }
        </div>
    )
}

export default ModelPage;