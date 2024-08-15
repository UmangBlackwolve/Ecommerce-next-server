const user = require("../modal/User");

const DefaultAdmin = async () => {
    try {
        const defaultuser = await user.findOne();
        if (!defaultuser) {
            const newuser = new user({
                name: "admin",
                email: "admin@123.com",
                password: "$2a$10$p.5aym.vMTX04biZ2nqboOAqkpnKWtmWv6VP3xR9wygofNmaX6BFK",
                role: "Admin"
            });
            await newuser.save();
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = DefaultAdmin
