import * as api from "../api"

import {CREATE_POST, DELETE_POST, UPDATE_POST, FETCH_POST_BY_ID, FETCH_ALL_POSTS, FETCH_POST_BY_UserID } from "../utils/constant";

export const createPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createPost(postData)
    } catch (error) {
        console.log(error)
    }
}
export const deletePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePost(id)
        window.location.reload();
    } catch (error) {
        console.log(error)
    }
}
export const updatePost = (id, postData) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, postData)
        console.log("updatePost",postData);
        window.location.replace(`/post/${id}`)
    } catch (error) {
        console.log(error)
    }
}
export const fetchPostByID = (postID) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostByID(postID)
        dispatch({type:FETCH_POST_BY_ID, data})
    } catch (error) {
        console.log(error)
    }
}
export const fetchPostByUserID = (userId) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostByUserID(userId)
        dispatch({type:FETCH_POST_BY_UserID, data})
    } catch (error) {
        console.log(error)
    }
}
export const fetchAllPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllPosts()
        dispatch({type:FETCH_ALL_POSTS, data})
    } catch (error) {
        console.log(error)
    }
}