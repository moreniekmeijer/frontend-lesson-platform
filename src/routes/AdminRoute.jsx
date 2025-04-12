import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext.jsx";

function AdminRoute({ element }) {
    const { isAuth, user } = useContext(AuthContext);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return element;
}

export default AdminRoute;
