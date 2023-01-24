type ButtonProps = {
    text: string;
    type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ type ,text }) => {
    return (
        <button type={type} className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold">
            {text}           
        </button>
    );
}

export default Button;