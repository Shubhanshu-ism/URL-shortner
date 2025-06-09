const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next) {
    // const userUid =  req?.cookies?.uid;
    // console.log(req.headers)
    // const userUid =  req.headers["authorization"]
    // // const userUID  = req.headers["authorization"];
    // if(!userUid) return res.redirect("/login")
    // console.log(userUid)

    
  
    // const token = userUid.split("Bearer ")[1];
    // const user = getUser(userUid);
    const auth = req.get("Authorization") || "";
    const [, token] = auth.match(/^Bearer (.+)$/) || [];
    if (!token) return res.redirect("/login");
    const user = getUser(token)
    if(!user) return res.redirect("/login");
    req.user = user;
    next()
}
async function checkAuth(req, res, next) {
//   const userUid = req?.cookies?.uid;
  

//   const user = getUser(userUid);
  
//   req.user = user;
//   next();
    console.log(req.headers);
    // const userUid = req.headers["authorization"];
    // const token = userUid.split("Bearer ")[1];
    const auth = req.get("Authorization") || "";
    const [, token] = auth.match(/^Bearer (.+)$/) || [];
    if (!token){
      req.user = null;
      return next(); // Not authenticated but not critical
    }
    const user = getUser(token);
    // req.user = user;
    // next();
    
    req.user = user || null;
    next();
}
module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};