const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishToUpdateUserQueue = async (id, data) => {
  try {
    let UpdateUserPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.UPDATE_USER_DETAILS_QUEUE,
      async (msg) => {
        console.log(`${KEYS.UPDATE_USER_DETAILS_QUEUE} publishing...`);
      }
    );
    const channel = await UpdateUserPublisher.getChannel();
    await UpdateUserPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
