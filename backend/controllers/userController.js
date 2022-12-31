import { User } from "../models/User.js";
import generateId from "../helpers/generateId.js";

export const registerUser = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        const error = new Error('Email is missing or invalid');
        return res.status(400).json({msg: error.message});
    }

    const userExists = await User.findOne({ email });

    if(userExists) {
        const error = new Error('User already registered');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        user.token = generateId();
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (error) {
        console.log(error);
    }
}

export const authUser = async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error('The user does not exist');
        return res.status(404).json({msg: error.message});
    }

    if (!user.confirmed) {
        const error = new Error('Your account is not confirmed yet');
        return res.status(403).json({msg: error.message});
    }

}