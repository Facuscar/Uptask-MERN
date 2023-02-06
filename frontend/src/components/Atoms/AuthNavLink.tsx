import { Link } from "react-router-dom";

type AuthNavLinkProps = {
    to: string;
    text: string;
}

const AuthNavLink: React.FC<AuthNavLinkProps> = ({ text, to }) => <Link to={to}>{text}</Link>

export default AuthNavLink;