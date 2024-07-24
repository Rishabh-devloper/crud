const passport = require('passport')
const LocalStratergy = require('passport-local').Strategy
const person = require('./models/Person')





passport.use(new LocalStratergy(async (username, password, done) => {
    try {

        const user = await person.findOne({ username: username })

        if (!user) {
            return done(null, false, { message: 'Invalid username or password' })
        }
        const isPasswordMatch = user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: 'Invalid username or password' })
        }

    } catch (error) {
        return done(error)

    }
}))

module.exports = passport