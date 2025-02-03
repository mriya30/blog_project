const passport = require("passport");
const Admin = require('../model/admin.model');
const { hashToPlain } = require("../utilis/password");
const localStrategry = require('passport-local').Strategy
module.exports = async (passport) => {
    passport.use(new localStrategry({ usernameField: 'email' }, async (email, password, done) => {
        //check email id
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return done(null, false, console.log('user not found'))
        }
        const match = await hashToPlain(password, admin.password)
        if (!match) {
            return done(null, false, console.log('password not match'))
        }
        return done(null, admin)
    }))

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await Admin.findById(id)
            if(user){
                done(null, user)
            }
    })
    };