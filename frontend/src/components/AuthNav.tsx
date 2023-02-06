import AuthNavLink from "./Atoms/AuthNavLink";

type AuthNavProps = {
    leftTo: string;
    rightTo: string;
    leftText: string;
    rightText: string;
};

const AuthNav: React.FC<AuthNavProps> = ({ leftText, leftTo, rightText, rightTo }) => {
    return (
        <nav className="lg:flex lg:justify-between">
            <AuthNavLink to={leftTo} text={leftText} />
            <AuthNavLink to={rightTo} text={rightText} />
        </nav>
    );
};

export default AuthNav;