const userModel = require("../Models/UserModel");
const moment = require("moment-timezone");


const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel
            .findById(req.userId)
            .select("-password");

        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: "get current user error" });
    }
};






module.exports = {
    getCurrentUser
};
