const { Router } = require("express");
// const Admin = require("./modules/AdminControl/routes/adminControl.routes")
const PremCheck = require("./modules/premchecks/routes/premcheck.routes");

const Tokenomics = require("./modules/tokenomics/routes");
const Research = require("./modules/research/routes/research.routes");
const CommunityResearch = require("./modules/communityresearch/routes");
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
