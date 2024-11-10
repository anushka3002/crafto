import axios from "axios";
import { GET_QUOTE_DATA, GET_QUOTE_DATA_FAIL, GET_QUOTE_DATA_SUCCESS, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, MEDIA_URL, MEDIA_URL_FAIL, MEDIA_URL_SUCCESS } from "../Constant/constant"

export const login = (loginData) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN
        });
        const response = await axios.post(
            'https://assignment.stage.crafto.app/login',
            loginData,
            { headers: { 'Content-Type': 'application/json' } }
        );
        localStorage.setItem("token",response?.data?.token)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    }
}

export const getMediaUrl = (image) => async (dispatch) => {
    try {
        dispatch({
            type: MEDIA_URL
        });
        const response = await axios.post(
            'https://crafto.app/crafto/v1.0/media/assignment/upload',
            image,
            { headers: { 'Content-Type': 'multipart/form-data', } }
        );
        dispatch({
            type: MEDIA_URL_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: MEDIA_URL_FAIL,
            payload: error
        })
    }
}

export const getQuote = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_QUOTE_DATA
        });
        const token = localStorage.getItem('token')
        const response = await axios.get(
            'https://assignment.stage.crafto.app/getQuotes?limit=20&offset=0',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );
        dispatch({
            type: GET_QUOTE_DATA_SUCCESS,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: GET_QUOTE_DATA_FAIL,
            payload: error
        })
    }
}