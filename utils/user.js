import { get } from "./fetch";

const CURRENT_VERSION = 1;

const storageGet = (key) => {
    return window.localStorage.getItem(key);
}

const storageSet = (key, value) => {
    window.localStorage.setItem(key, value);
}

export const getUserLogin = () => {
    return storageGet('tokenAuth');
}

export const loginSuccess = (token) => {
    storageSet('tokenAuth', token);
    return fetchUserData();
}

export const logOut = () => {
    window.localStorage.removeItem('tokenAuth');
}

export const getUserData = () => {
    if (storageGet('version') === null || storageGet('version') < CURRENT_VERSION) {
        storageSet('version', CURRENT_VERSION);
        return fetchUserData().then(res => res);
    }
    return JSON.parse(storageGet('currentUser')) || {};
}

export const fetchUserData = () => {

    return new Promise((resolve, reject) => {

        get("/api/users/myuser/").then((data) => {
            storageSet('version', CURRENT_VERSION);
            storageSet('currentUser', JSON.stringify(data))
            resolve(data)
        });

    });

}

