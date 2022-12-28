import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (error) {
        
    }
}