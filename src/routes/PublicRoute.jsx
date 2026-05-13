import {useContext} from "react";
import {Navigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";
import Loader from "../components/loader/Loader";


function PublicRoute({element}) {
    const {isAuth, status} = useContext(AuthContext);
    if (status === 'pending') return <Loader />;

    return isAuth ? <Navigate to="/" /> : element;
}

export default PublicRoute;
