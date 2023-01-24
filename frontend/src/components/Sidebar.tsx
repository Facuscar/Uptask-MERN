import { Link } from "react-router-dom";

import { PATH } from "../constants/path";
import useAuth from "../hooks/useAuth";

const Sidebar: React.FC = () => {

    const userContext = useAuth();
    let auth = null;

    if (userContext) ({ auth } = userContext);

    return (
        <aside className="md:w80 lg-w96 px-5 py-10">
            <p className="text-xl font-bold">Hello! {auth?.name}</p>

            <Link to={PATH.CREATE_PROJECT} className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg" >New project</Link>
        </aside>
    );
}

export default Sidebar;