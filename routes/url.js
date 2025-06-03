const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGetAllURL,
  handleGetAnalytics,
} = require("../controllers/url");

router.route("/").post(handleGenerateNewShortURL).get(handleGetAllURL);
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports = router;
