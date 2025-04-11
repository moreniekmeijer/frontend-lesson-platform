import {jwtDecode} from 'jwt-decode';

function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Fout bij het decoderen van de token:', error);
        return true;
    }
}

export default isTokenExpired;