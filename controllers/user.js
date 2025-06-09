const User = require('../models/user')
const { v4: uuidv4 } = require("uuid");
const {
  setUser,
  getUser
} = require('../service/auth')
async function handleSignUp(req,res) {
    const {name,email,password} = req.body;
    if (!name|| !email|| !password)
      return res.status(400).json({ error: "All fields are required" });
    await User.create({
        name:name ,
        email: email ,
        password: password,
    })
    return res.redirect("/");
} 
async function handleLogin(req,res) {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Invalid email or password" });

    const user = await User.findOne({ email, password });
    // console.log("user",user)
    if (!user){
        return res.render("login", {
          error: "Invalid details",
        });
    }
    // const sessionId = uuidv4();
    // setUser(sessionId, user)
    const token = setUser(user);
    console.log(req.body);
    // res.cookie("uid", sessionId);
    return res.json({token})
    

  //   res.cookie("uid",token,)
  // return res.redirect('/')
}
module.exports ={
    handleSignUp,
    handleLogin
}