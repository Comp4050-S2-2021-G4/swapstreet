import { API } from '../config'
import bcrypt from 'bcryptjs'

export const register = async(user) => {
    const salt = await bcrypt.genSalt(10);
    // console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(user.password,salt);
    user.password = hashedPassword;
    const result = await fetch(`${API}/register`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        })
    try{
        console.log("Checking password")
        console.log(user)
        return user;
    } catch{
        return {error : "Try again"}
    }
}

export const login = async (user) => {
    const loginError = { error: 'Incorrect email or password' };
    const result = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    const resultData = await result.json();
    if (resultData === null) {
        return loginError
    } else {
        const isCorrectPassword = await bcrypt.compare(user.password, resultData.password)
        if (isCorrectPassword) {
            return { user: resultData, error: undefined }
        } else {
            return loginError
        }
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const logout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/logout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        const item = JSON.parse(localStorage.getItem('jwt'));
        return { user: item };
    } else {
        return false;
    }
};

