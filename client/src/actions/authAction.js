import * as api from "../api"

import { AUTH, LOGIN_ERROR, LOGOUT, USER_LIST } from "../utils/constant";

export const signin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        if(data.error){
            dispatch({type:LOGIN_ERROR, data});
        }else{
            dispatch({ type: AUTH, data });                   
        } 
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)
        console.log("data:",data)
        if(data.error){
            dispatch({type:LOGIN_ERROR, data});
        }else{
            dispatch({ type: AUTH, data });                   
        } 
    } catch (error) {
        console.log("!!error!!!",error)
    }
}
export const logout = () => async (dispatch) => {
    try {
        await api.logout()
        dispatch({type:LOGOUT});
    } catch (error) {
        
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers()
        dispatch({type:USER_LIST, data});
    } catch (error) {
        dispatch({type:LOGIN_ERROR});
    }
}
export const fetchUser = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUser()
        if(data.error){
            dispatch({type:LOGIN_ERROR});
        }else{
            dispatch({ type: AUTH, data });                   
        } 
    } catch (error) {
    }
}