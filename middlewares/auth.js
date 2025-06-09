const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    // console.log(req.headers)
    // const authorizationHeaderValue = req.get("Authorization") || "";
    // req.user=null;
    // // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next();
    // const [, token] = authorizationHeaderValue.match(/^Bearer (.+)$/) || [];
    // if (!token) return next();
    // const user = getUser(token);
    // req.user = user || null;
    // next();


    const tokenCookie = req.cookies?.token;
    req.user=null;
    if(!tokenCookie) return next();
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user || null;
    next();
}

// Curried function  with closure
function restrictTo(roles=[]) {
    return function(req, res, next){
        if(!req.user) res.redirect('/login')
        if(!roles.includes(req.user.role)) res.end("Unauthorised")
        return next()
    }
}
module.exports = {
  checkForAuthentication,
  restrictTo,
};