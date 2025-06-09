const  shortid  = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body || !body.url)
    return res.status(400).json({ error: "URL link is required" });

  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    createdBy : req.user._id,
    visitHistory: [],
  });
  // const urls = await URL.find({ createdBy : req.user._id});
  // return res.json({ id: shortID });
  return res.render("home", {
    id: shortID,
    // urls
  });
}
async function handleGetAllURL(req,res) {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  res.render("home", {
    urls: allUrls,
  });
  // const result = await URL.find({})
  if (!allUrls) return res.status(404).json({ error: "no url founded" });
    return res.status(200).json(result)
}
async function handleGetAnalytics(req,res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId})
  if (!result) return res.status(404).json({ error: "no url founded" });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAllURL,
  handleGetAnalytics,
};
