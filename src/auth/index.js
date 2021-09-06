import { API, ACCESS_TOKEN_SECRET } from '../config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
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
            const token = jwt.sign(resultData, ACCESS_TOKEN_SECRET, { expiresIn: '2d'})
            return {
                user: resultData,
                token: token,
                error: undefined
            }
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
        window.location.reload();
        window.location.href = "/";
        next();
        return fetch(`${API}/logout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout success');
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
        try {
            return { user : jwt.verify(item, ACCESS_TOKEN_SECRET) }
        } catch (e) {
            localStorage.removeItem('jwt')
            return false
        }
    } else {
        return false;
    }
};

