const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const sceret = "Shubh$jain@anshu"
function setUser(user){
    // const payload = {
    //     // id,
    //     ...user,
    // }
    return jwt.sign({
        _id:user._id,
        email:user.email
    }, sceret);
    // sessionIdToUserMap.set(id,user)
}
function getUser(token){
    if(!token) return null;
    try {
        return jwt.verify(token, sceret);
    } catch (error) {
        return null;
    }
    
    // return sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};