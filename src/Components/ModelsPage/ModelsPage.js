import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { db } from '../../firebase';
import { setBrand, setModel } from '../../redux/carReducer';
import ReturnButton from '../ReturnButton/ReturnButton';
import './ModelsPage.css';

const ModelsPage = () => {

    const brand = useSelector(state => state.carReducer.selectedBrand);
    const dispatch = useDispatch();

    const [brandData, setBrandData] = useState(null);

    useEffect(() => {
        if (brand) {
            db.collection("Brands").doc(brand).onSnapshot(doc => {
                console.log(doc.data());
                setBrandData(doc.data());
            })
        }
        else {
            console.log('No brand');
        }
    }, []);

    return (
        <div>
            <ReturnButton onClick={() => {dispatch(setBrand(null))}} path='/' />
            <h1>{brand}</h1>
            {(!brand) ?
                <Redirect to='/' />
                :
                <div>
                    {(!brandData) ?
                        <div></div>
                        :
                        <div className='models'>
                            <div className='models__inner'>
                                {brandData.models.map(elem =>
                                    <NavLink className='models__item' onClick={() => { dispatch(setModel(elem.modelName)) }} to={`models/${elem.modelName.toLowerCase()}`}>
                                        <div className='models__name'>{elem.modelName}</div>
                                        <div className='models__num'>{`(${elem.reviews.length} reviews)`}</div>
                                    </NavLink>)}
                            </div>
                        </div>}
                </div>}

        </div>
    )
}

export default ModelsPage;