import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
    return (
        <>
            <div>This is a div</div>
            <Outlet />
        </>
    )
}

export default AuthLayout;