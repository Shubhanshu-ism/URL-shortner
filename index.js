const express = require("express");
const app = express();
const { urlRoute, userRoute, staticRoute } = require("./routes/index");
const URL = require("./models/url")
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");
const PORT = 8000;
const { connectMongoDB } = require("./connection");

connectMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(()=> console.log("Mongoose is Connected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication)

app.set('view engine', "ejs")
app.set("views", path.resolve("./views"));
app.get('/test',async(req,res)=>{
  const allURL = await URL.find({});
  return res.render("home",{
    urls: allURL
  })
})
app.use("/url", restrictTo(["NORMAL", "ADMIN"]),urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const result= await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if(!result) return res.status(404).json({error:"Invalid shortURL"})
//   return res.json(result)
  res.redirect(result.redirectUrl)
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
