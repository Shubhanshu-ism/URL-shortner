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
    visitHistory: [],
  });

  // return res.json({ id: shortID });
  return res.render("home", {
    id: shortID,
  });
}
async function handleGetAllURL(req,res) {
  const result = await URL.find({})
  if(!result) return res.status(404).json({error: "no url founded"})
    return res.status(200).json(result)
}
async function handleGetAnalytics(req,res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId})
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
