const mongoose = require("mongoose");
const app = require("./src");
const KEYS = require("./src/_config/keys");
const logger  = require('./logger.conf');
const CommentsLikesConsumer = require("./src/_queue/consumers/commentLikes.consumer");
const CommmnetRepliesConsumer = require("./src/_queue/consumers/commentReplies.consumer");
const ResearchComentsConsumer = require("./src/_queue/consumers/rComments.consumer");
const ResearchDetailsConsumer = require("./src/_queue/consumers/rDetails.consumer");
const ResearchLikesConsumer = require("./src/_queue/consumers/rLikes.consumer");


CommentsLikesConsumer.consume("Update Research Comment Likes");
CommmnetRepliesConsumer.consume("Update Research Comment Replies");
ResearchComentsConsumer.consume("Update Research Comments");
ResearchDetailsConsumer.consume("Update Research Details");
ResearchLikesConsumer.consume("Update Research Likes");


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