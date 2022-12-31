import { User } from "../models/User.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

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

    console.log(req.body);
    const user = await User.findOne({ email })

    if (!user) {
        const error = new Error('The user does not exist');
        return res.status(404).json({msg: error.message});
    }

    if (!user.confirmed) {
        const error = new Error('Your account is not confirmed yet');
        return res.status(403).json({msg: error.message});
    }

    if (!await user.verifyPassword(password)) {
        const error = new Error('Your password and email do not match');
        return res.status(404).json({msg: error.message});
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWT(user._id),
    })
}