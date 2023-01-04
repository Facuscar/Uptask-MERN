import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const checkAuth = async (req, res, next) => {
    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = await User.findById(id).select('-password -confirmed -token -createdAt -updatedAt -__v');
            console.log(req.user);

            return next();
        } catch (error) {
            return res.status(404).json({ msg: 'There was an error' });
        }
    }

    const error = new Error('Invalid token');
    return res.status(401).json({ msg: error.message })
}

export default checkAuth;