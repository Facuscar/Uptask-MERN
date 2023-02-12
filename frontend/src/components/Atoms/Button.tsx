import { HTMLAttributes } from "react";

type ButtonProps = {
    text: string;
    type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<HTMLAttributes<HTMLButtonElement> & ButtonProps> = ({ type, text, ...props }) => {
    return (
        <button type={type} className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold" {...props}>
            {text}           
        </button>
    );
}

export default Button;