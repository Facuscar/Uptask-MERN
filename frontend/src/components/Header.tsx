import { Link } from "react-router-dom";

import { PATH } from "../constants/path";
import SearchInput from "./Atoms/SearchInput";
import Button from "./Atoms/Button";

const Header: React.FC = () => {
    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center">Uptask</h2>
                <SearchInput id="header_search" placeholder="Search project" />

                <div className="flex items-center gap-4">
                    <Link to={PATH.PROJECTS} className="font-bold uppercase">Projects</Link>
                    <Button type="button" text="Log out" />
                </div>
            </div>
        </header>
    );
}

export default Header;