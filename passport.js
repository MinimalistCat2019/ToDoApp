const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const cookieExtractor = req => {
    const token = null;
    if(req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}
// used for authorisation, where we want to protect a resource
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "NoobCoder"
    }, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if(err)
            return done(err, false);
        if(user)
            return done(null, user);
        else    
            return done(null, false);
    });
}));

// used for authentication, using username and password - only used when we log in
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if(err)
            return done(err);
        if(!user) 
            return done(null, false);
        user.comparePassword(password, done);
    });
}));