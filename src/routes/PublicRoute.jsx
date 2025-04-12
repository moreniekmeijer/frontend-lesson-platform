import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";

function PublicRoute({element}) {
    const {isAuth, status} = useContext(AuthContext);
    if (status === 'pending') return <p>Loading...</p>;

    return isAuth ? <Navigate to="/" /> : element;
}

export default PublicRoute;
