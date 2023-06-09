const { Connnection } = require("../index");
const KEYS = require("../../_config/keys");

exports.publishAllFollowersNotifcation = async (id, data) => {
  try {
    let NotificationPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.NOTIFY_FOLLOWERS_QUEUE,
      async (msg) => {
        console.log(`${KEYS.NOTIFY_FOLLOWERS_QUEUE} publishing...`);
      }
    );
    const channel = await NotificationPublisher.getChannel();
    await NotificationPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
