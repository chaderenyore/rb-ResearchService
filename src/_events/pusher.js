const Pusher = require("pusher");
const KEYS = require("../_config/keys");

exports.init_pusher = async () => {
  try {
    const pusher = await new Pusher({
      appId: KEYS.PUSHER_APPID,
      key: KEYS.PUSHER_KEY,
      secret: KEYS.PUSHER_SECRET,
      cluster: KEYS.PUSHER_CLUSTER,
      useTLS: true,
    });
    //   handle error
    return pusher;
  } catch (error) {
    console.error(error);
  }
};
