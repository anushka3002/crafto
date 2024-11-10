import { CREATE_QUOTE_DATA, CREATE_QUOTE_DATA_FAIL, CREATE_QUOTE_DATA_SUCCESS, GET_QUOTE_DATA, GET_QUOTE_DATA_FAIL, GET_QUOTE_DATA_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, MEDIA_URL, MEDIA_URL_FAIL, MEDIA_URL_SUCCESS } from "../Constant/constant";

export const loginReducer = (state = {loginData:[]}, action) =>{
    switch(action.type){
        case LOGIN:
            return {
                loading: true,
                loginData: []
            }
        case LOGIN_SUCCESS:
            return{
                loading: false,
                loginData: action.payload
            }
        case LOGIN_FAIL:
            return{
                loading: false,
                loginData: action.payload
            }
        default:
            return state;
    }
}

export const mediaUrlReducer = (state = {mediaUrlData:[]}, action) =>{
    switch(action.type){
        case MEDIA_URL:
            return {
                loading: true,
                mediaUrlData: []
            }
        case MEDIA_URL_SUCCESS:
            return{
                loading: false,
                mediaUrlData: action.payload
            }
        case MEDIA_URL_FAIL:
            return{
                loading: false,
                mediaUrlData: action.payload
            }
        default:
            return state;
    }
}

export const getQuoteReducer = (state = {quoteData:[]}, action) =>{
    switch(action.type){
        case GET_QUOTE_DATA:
            return {
                loading: true,
                quoteData: []
            }
        case GET_QUOTE_DATA_SUCCESS:
            return{
                loading: false,
                quoteData: action.payload
            }
        case GET_QUOTE_DATA_FAIL:
            return{
                loading: false,
                quoteData: action.payload
            }
        default:
            return state;
    }
}

export const createQuoteReducer = (state = {postQuoteData:[]}, action) =>{
    switch(action.type){
        case CREATE_QUOTE_DATA:
            return {
                loading: true,
                postQuoteData: []
            }
        case CREATE_QUOTE_DATA_SUCCESS:
            return{
                loading: false,
                postQuoteData: action.payload
            }
        case CREATE_QUOTE_DATA_FAIL:
            return{
                loading: false,
                postQuoteData: action.payload
            }
        default:
            return state;
    }
}