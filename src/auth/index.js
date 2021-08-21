import { API } from '../config'
import bcyrpt from 'bcryptjs'


export const register = (user) => {
    // console.log(name, email, password);
    return (
        fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
    )
}

export const login = async (user) => {
    const result = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    const resultData = await result.json();
    const isCorrectPassword = await bcyrpt.compare(user.password, resultData.password)
    if (isCorrectPassword) {
        return { user: resultData, error: undefined }
    } else {
        return { error: 'Incorrect email or password' }
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

