// Api.js
import axios, { Method } from 'axios';

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  // baseURL : '/' // it's not recommended to have this info here.
  baseURL : 'http://localhost:8000/' // it's not recommended to have this info here.
});

// implement a method to execute all the request from here.
const apiRequest = async (method: Method, url: string, request: object) => {
    const headers = {
        authorization: ''
    };
    //using the axios instance to perform the request that received from each http method
    return await axiosAPI({
        method,
        url,
        data: request,
        headers
      });
};

// function to execute the http get request
const get = async (url: string) => await apiRequest('get',url, {});

// function to execute the http delete request
const deleteRequest = async (url: string, request: object) =>  await apiRequest('delete', url, request);

// function to execute the http post request
const post = async (url: string, request: object) => await apiRequest('post', url, request);

// function to execute the http put request
const put = async (url: string, request: object) => await apiRequest('put', url, request);

// function to execute the http path request
const patch = async (url: string, request: object) =>  await apiRequest('patch', url, request);

// expose your method to other services or actions
const API ={
    get,
    delete: deleteRequest,
    post,
    put,
    patch
};
export default API;