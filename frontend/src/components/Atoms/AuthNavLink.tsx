import { Link } from "react-router-dom";

type AuthNavLinkProps = {
    to: string;
    text: string;
}

const AuthNavLink: React.FC<AuthNavLinkProps> = ({ text, to }) => (
    <Link to={to} className="block text-center my-5 text-slate-500 uppercase text-sm">{text}</Link>
);

export default AuthNavLink;