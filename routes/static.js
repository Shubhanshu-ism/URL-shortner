const express = require("express");
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo([ "ADMIN"]), async (req, res) => {
  // if(!req.user) return res.redirect('/login')
  const allUrls = await URL.find({});
  res.render("admin", {
    urls: allUrls,
  });
});
router.get('/',restrictTo(["NORMAL", "ADMIN"]) ,async(req,res)=>{
  // if(!req.user) return res.redirect('/login')
    const allUrls = await URL.find({createdBy: req.user._id});
    res.render("home", {
      urls: allUrls,
    });
})

router.get("/signup",  (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});
module.exports = router;