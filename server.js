const mongoose = require("mongoose");
const app = require("./src");
const KEYS = require("./src/_config/keys");
const logger  = require('./logger.conf');
const CommentsLikesConsumer = require("./src/_queue/consumers/commentsLikes.consumer");
const CommmnetRepliesConsumer = require("./src/_queue/consumers/commentReplies.consumer");
const ResearchComentsConsumer = require("./src/_queue/consumers/rComments.consumer");
const ResearchDetailsConsumer = require("./src/_queue/consumers/rDetails.consumer");
const ResearchLikesConsumer = require("./src/_queue/consumers/rLikes.consumer");


mongoose.set('strictQuery', true);
mongoose
  .connect(KEYS.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    logger.info(`Research Service Database Connected......`)
    const PORT = process.env.PORT || 2102;
    const server = app.listen(PORT, () => {
      
      logger.info(`Research Service Server has started!... and running on port ${PORT}`);
      
    });
  }).catch(error => console.log(error));

(exports._initQueue = async()=>{
await CommentsLikesConsumer.consume("Update Research Comment Likes");
await CommmnetRepliesConsumer.consume("Update Research Comment Replies");
await ResearchComentsConsumer.consume("Update Research Comments");
await ResearchDetailsConsumer.consume("Update Research Details");
await ResearchLikesConsumer.consume("Update Research Likes");
})()
