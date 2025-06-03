const express = require("express");
const app = express();
const urlRoute = require("./routes/url");
const URL = require("./models/url")
const PORT = 8000;
const { connectMongoDB } = require("./connection");

connectMongoDB("mongodb://127.0.0.1:27017/urlShortner").then(()=> console.log("Mongoose is Connected"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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
