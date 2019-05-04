import axios from 'axios';
// import { configConstants } from '../constants';


export default function setAuthorizationToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user != null){
        if(user.access_token !== undefined  && user.access_token !== null){    
            console.log('inset token')
            window.axios = axios
            // BASE URL DE LA API
            axios.defaults.baseURL = "configConstants.API_GATEWAY_ENDPOINT"      
            // SE DEJA POR DEFECTO EL HEADER AUTHORIZATION CON EL TOKEN            
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`
         } 
         else {
             delete axios.defaults.headers.common['Authorization']
         }
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
    
}

