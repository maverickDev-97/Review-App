const SET_USER = 'SET_USER';
const RESET_USER = 'RESET_USER';

const initialState = {
    user: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USER : {
            return {
                ...state,
                user: action.user
            }
        }
        case RESET_USER : {
            return {
                ...state,
                user: null
            }
        }
        default: return state;
    }
}

export const setUser = (user) => ({type: SET_USER, user});
export const resetUser = () => ({type: RESET_USER});

export default authReducer;