import { useReducer } from 'react';
import { setSession } from 'src/auth/context/jwt/utils';
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export async function loginByTon(info) {
    const url = endpoints.auth.loginTon;
    try {
        const response = await axios.post(url, info);
        if (response.data) {
            window.localStorage.setItem("user", JSON.stringify(response.data.data));
            setSession(response.data.token);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
}

export async function loginUserPass(info) {
    const url = endpoints.auth.loginUser;
    try {
        const response = await axios.post(url, info);
        if (response.data) {
            window.localStorage.setItem("user", JSON.stringify(response.data.data));
            setSession(response.data.token);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error fetching data:', error);
        return false;
    }
}


