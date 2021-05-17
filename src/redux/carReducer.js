const SET_BRAND = 'SET_BRAND';
const SET_MODEL = 'SET_MODEL';


const initialValue = {
    selectedBrand: null,
    selectedModel: null
}

const carReducer = (state = initialValue, action) => {
    switch(action.type) {
        case SET_BRAND : {
            return {
                ...state,
                selectedBrand: action.brand
            }
        }
        case SET_MODEL : {
            return {
                ...state,
                selectedModel: action.model
            }
        }
        default: return state;
    }
}

export const setBrand = (brand) => ({type: SET_BRAND, brand});
export const setModel = (model) => ({type: SET_MODEL, model});
export default carReducer;