const { Router } = require("express");
// const Admin = require("./modules/AdminControl/routes/adminControl.routes")
const PremCheck = require("./modules/premcheck/routes/premcheck.routes");

const Tokenomics = require("./modules/tokenomicsHealth/routes/index");
const Research = require("./modules/research/routes/research.routes");
const CommunityResearch = require("./modules/communityresearchmodule/routes/index");
const Likes = require("./modules/likes/routes/likes.routes");
const Comments = require("./modules/comments/routes/comments.routes");



module.exports = () => {
  
  const router = Router();
  // router.use("/admin",   Admin);
  router.use("/premcheck", PremCheck);
  router.use("/tokenomics", Tokenomics);
  router.use("/", Research);
  router.use("/community-research", CommunityResearch);
  router.use("/like", Likes);
  router.use("/comment", Comments);
  return router;
};
