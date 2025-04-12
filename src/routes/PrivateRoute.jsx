import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from "../context/AuthContext.jsx";

function PrivateRoute({ element }) {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    return element;
}

export default PrivateRoute;
