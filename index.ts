import { hourReport } from "./time";
import { getMsg } from "./msg";
import config from "./config.json";

const { host, port, authKey, qq, enableWebsocket, groupId } = config;

const Mirai = require("node-mirai-sdk");

//服务端设置(*)
const bot = new Mirai({
  host: `${host}:${port}`, // your server host
  authKey,
  qq, // your qq
  enableWebsocket,
});

//auth认证(*)
bot.onSignal("authed", () => {
  console.log(`Authed with session key ${bot.sessionKey}`);
  bot.verify();
});

//获取好友列表
bot.onSignal("verified", async () => {
  console.log(`Verified with session key ${bot.sessionKey}`);
  const friendList = await bot.getFriendList();
  console.log(`There are ${friendList.length} friends in bot`);
});

//接受消息,发送消息(*)
bot.onMessage((message: any) => {});

/* 开始监听消息(*)
 * 'all' - 监听好友和群
 * 'friend' - 只监听好友
 * 'group' - 只监听群
 */
bot.listen("all");

hourReport((time: number) => {
  const msgs = getMsg(time);
  const target = {
    type: "GroupMessage",
    messageChain: msgs,
    sender: { group: { id: groupId } },
    reply() {},
    quoteReply() {},
    recall() {},
  };
  bot.sendMessage(msgs, target);
});

process.on("exit", () => {
  bot.release();
});
