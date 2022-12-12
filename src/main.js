const { WechatyBuilder } = require("wechaty");
const QRCode = require("qrcode");
const dotenv = require("dotenv")
dotenv.config()
const { getReply } = require("./chatGPT");

const bot = WechatyBuilder.build({
    name: "wechat-assistant", 
});

async function main() {
    bot
        .on("scan", async (qrcode, status) => {
            console.log(`使用机器人微信扫码二维码登录: ${status}\n${url}`);
            console.log("如果上面的二维码错位导致无法识别，请用浏览器打开下面的地址");
            console.log(
                await QRCode.toString(qrcode, { type: "terminal", small: true })
            );
        })
        .on("login", async (user) => {
            console.log(`机器人 ${user} 已登录`);
        })
        .on("message", async (message) => {
            try {
                if (message.text().startsWith("/ding")) {
                    await message.say("dong");
                    return;
                }
                const contact = message.talker();
                const text = message.text()
                const room = message.room()
                if (room) { //判断群聊
                    const topic = await room.topic()
                    // console.log(`群: ${topic} 用户名: ${contact.name()} 内容: ${text}`)
                    if (await message.mentionSelf()) {
                        let prompt = message.text().replace(/@([\u4e00-\u9fa5]{3})\s/, '')
                        getReply(prompt).then((res) => {
                            message.say(`${prompt}\n-----------\n${res.data.choices[0].text.replace(/^\s+|\s+$/g, '') }`).then(res=>{
                                console.log('发消息成功！') 
                            }).catch(err=>{
                                console.log(err)
                            })
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                } else {
                    if (message.text() == '') return
                    // console.log(`好友: ${contact.name()} 内容: ${text}`)
                    getReply(text).then((res) => {
                        let result = res.data.choices[0].text.replace(/^\s+|\s+$/g, '')
                        message.say(result).then(res=>{
                            console.log('发消息成功！')
                        }).catch(err=>{
                            console.log('发消息失败！', err)
                        })
                    }).catch(err=>{
                        console.log(err)
                    })
                }
            } catch (e) {
                console.error(e);
            }
        });
    try {
        await bot.start();
    } catch (e) {
        console.error(
            `⚠️ Bot start failed, can you log in through wechat on the web?: ${e}`
        );
    }
}
main();
