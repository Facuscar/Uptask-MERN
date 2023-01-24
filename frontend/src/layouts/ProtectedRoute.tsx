import { Outlet, Navigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const userContext = useAuth();

    let auth = null;
    let loading = null;

    if ( userContext ) ({ auth, loading } = userContext);

    if (loading) return <>Loading..</>;

    return (
        <>
            {auth?._id ? (
                <div className="bg-gray-100">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="flex-1 p10">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to={"/"} />}
        </>
    )
}

export default ProtectedRoute;