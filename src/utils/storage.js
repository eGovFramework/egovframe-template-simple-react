function getItem(storage, key) {
    const jsonStr = storage.getItem(key);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr);
}

function setItem(storage, key, value) {
    const str = (value === undefined) ? null : value;
    storage.setItem(key, JSON.stringify(str));
}

function removeItem(storage, key) {
    storage.removeItem(key);
}

export function getLocalItem(key) {
    return getItem(localStorage, key);
}

export function setLocalItem(key, value) {
    setItem(localStorage, key, value);
}

export function removeLocalItem(key) {
    removeItem(localStorage, key);
}

export function getSessionItem(key) {
    return getItem(sessionStorage, key);
}

export function setSessionItem(key, value) {
    setItem(sessionStorage, key, value);
}

export function removeSessionItem(key) {
    removeItem(sessionStorage, key);
}