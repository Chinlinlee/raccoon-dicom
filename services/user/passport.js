const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userModel = require('../../models/mongodb/models/user');

/**
 * 
 * @param {import('passport')} passport 
 */
module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use("local-login", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        session: true,
        passReqToCallback: true
    }, async function(req, username, password, done) {
        let authResult = await auth(username, password);
        let authErrorMessage = {
            message: authResult.data
        }
        if ( authResult.code === 3 ) {
            return done(null, false, authErrorMessage);
        } else if ( authResult.code === 2 ) {
            return done(null, false, authErrorMessage);
        } else if ( authResult.code === 1 ) {
            return done(null, authResult.data);
        } else if ( authResult.code === 0 ) {
            return done(null, false, authErrorMessage);
        } else {
            return done(null, false, authErrorMessage);
        }
    }));
}

/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
async function auth(username, password) {
    try {
        let users = await userModel.find({
            username: username
        })
        .limit(1)
        .exec();
        if ( users.length > 0 ) {
            let user = users.pop();
            let passwordValidation = comparePassword(user, password);
            if (passwordValidation) {
                if (user.status == 1) return {
                    code: 1,
                    data: user
                };
                return {
                    code: 4,
                    data: "user not activate"
                }
            } 
            return {
                code: 2,
                data: "invalid user or password"
            }
        }
    } catch(e) {
        console.error(e);
        return {
            code: 0,
            data: "Oops! Server wrong happening, please contact maintainer"
        };
    }
}

/**
 * 
 * @param {string} password 
 */
async function comparePassword(userObj, password) {
    try {
        let compareResult = await bcrypt.compare(password, userObj.password);
        return compareResult;
    } catch(e) {
        console.error(e);
        return false;
    }

}