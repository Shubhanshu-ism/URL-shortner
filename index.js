const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url")
const path = require("path");
const PORT = 8000;
const { connectMongoDB } = require("./connection");

connectMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(()=> console.log("Mongoose is Connected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', "ejs")
app.set("views", path.resolve("./views"));
app.use(express.static("public"));
app.get('/test',async(req,res)=>{
  const allURL = await URL.find({});
  return res.render("home",{
    urls: allURL
  })
})
app.use("/url", urlRoute);
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
//   return res.json(result)
  res.redirect(result.redirectUrl)
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
