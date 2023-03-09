const { Router } = require("express");
const Research = require("./modules/research/routes/research.routes");
const Likes = require("./modules/research/routes/research.routes");
const Comment = require("./modules/research/routes/research.routes");
const AdminControl = require("./modules/adminControl/routes/adminControl.routes");


module.exports = () => {
  
  const router = Router();

  router.use("/", Research);
//   router.use("/admin",  AdminControl);
  return router;
};
