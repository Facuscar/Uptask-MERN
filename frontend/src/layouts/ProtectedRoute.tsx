import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const context = useAuth();

    let auth;

    if ( context ) ({ auth } = context);

    console.log(auth);

    return (
        <>
            {auth?._id ? 'Auth' : <Navigate to={"/"} />}
        </>
    )
}

export default ProtectedRoute;