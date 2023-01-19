import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const userContext = useAuth();

    let auth = null;
    let loading = null;

    if ( userContext ) ({ auth, loading } = userContext);

    if (loading) return 'Loading...';

    return (
        <>
            {auth?._id ? <Outlet /> : <Navigate to={"/"} />}
        </>
    )
}

export default ProtectedRoute;