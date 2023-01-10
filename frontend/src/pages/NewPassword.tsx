import Input from "../components/Form/Input";
import SubmitButton from "../components/Form/SubmitButton";

const NewPassword: React.FC = () => {
    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">Create your account and <span className="text-slate-700">projects</span></h1>
            <form action="" className="my-10 bg-white shadow rounded-lg p-10">
                <Input type="password" name="New Password" placeholder="New password" id="password" />
                <Input type="password" name="Repeat your new password" placeholder="Repeat your new password" id="second_password" />

                <SubmitButton value="Reset your password" />
            </form>
        </>
    )
}

export default NewPassword;