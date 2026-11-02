import axios from 'axios'
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll =()=>{
    return axios.get(`${baseURL}`)
}
/*
const getAll =(value)=>{
    return axios.get(`${baseURL}/${value}`)
}*/

export default { getAll }