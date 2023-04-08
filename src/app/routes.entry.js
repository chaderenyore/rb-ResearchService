const { Router } = require("express");
// const Admin = require("./modules/AdminControl/routes/adminControl.routes")
const PremCheck = require("./modules/PremChecks/routes/premcheck.routes");

const Tokenomics = require("./modules/Tokenomics/routes");
const Research = require("./modules/research/routes/Research.routes");
const CommunityResearch = require("./modules/CommunityResearch/routes");
const Likes = require("./modules/Likes/routes/likes.routes");
const Comments = require("./modules/Comments/routes/comments.routes");



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
