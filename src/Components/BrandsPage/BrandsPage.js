import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { db } from '../../firebase';
import { setBrand } from '../../redux/carReducer';
import './BrandsPage.css';

const BrandsPage = () => {

    const dispatch = useDispatch();

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        db.collection('Brands').get().then(data => {
            let brands = [];
            data.forEach(item => {
                // console.log(item.data());
                // brands.push(item.data().make);
                brands.push({
                    "brandName": item.data().make,
                    "modelsNum": item.data().models.length

                })
            })
            setBrands(brands);
        })

    }, [])

    const selectBrand = (e) => {
        dispatch(setBrand(e.target.innerHTML));
    }

    return (
        <div className='brands'>
            <h1>Brands</h1>
            <div className='brands__inner'>
                {brands.map(item =>
                    <NavLink className='brands__item' onClick={selectBrand} key={item.brandName} to='/models'>
                        <div className='brands__name'>{item.brandName}</div>
                        <div className='brands__num'>{item.modelsNum}</div>
                    </NavLink>)}
            </div>
        </div>
    )
}

export default BrandsPage;