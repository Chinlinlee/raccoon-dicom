const bcrypt = require('bcrypt');
const userModel = require('../../models/mongodb/models/user');

async function getUser(username) {
    try {
        let user = await userModel.findOne({
            username: username
        });
        return user;
    } catch(e) {
        throw e;
    }
}

/**
 * 
 * @param {Object} userObj 
 */
async function createUser(userObj) {
    try {
        let existsUser = await getUser(userObj.username);
        if (existsUser) {
            throw new Error(`User ${userObj.username} already exists`);
        }
        let cryptPassword = await bcrypt.hash(userObj.password, 10);
        let user = new userModel({
            ...userObj,
            password: cryptPassword,
            status: 0,
            userType: "normal"
        });
        let createdUser = await user.save();
        return createdUser;
    } catch(e) {
        throw e;
    }
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;