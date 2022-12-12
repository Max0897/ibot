# ibot



> 可以让你的微信快速接入chatGPT功能

## 🙌功能点🙌

- [x] 通过 wechaty，将 ChatGPT 接入微信

- [ ] <del>支持上下文</del>

  ...

## 在Linux上使用（✅ 推荐）

```sh
cp .env.example .env

vim .env
# 按i后移动光标将.env中的YOUR_KEY替换为在openAI官网获取的key
# 按Esc后输入 :wq 保存并关闭文件

# 安装依赖
npm i

# 运行项目
npm run dev
# 不出意外此时控制台会输出二维码

# 后台运行
# nohup npm run dev > run.log 2>&1 &
```





## 在Windows上使用

*自己折腾*😁😁😁



### 获取 OpenAI 的API key

[https://beta.openai.com/]: https://beta.openai.com/	"openAI官网"

##### 1. 注册

##### 2. 登录

##### 4. View API Keys

![如何查看apikey](/assets/img/Snipaste_2022-12-12_20-30-06.png)

##### 5. 创建一个新的Secret Key

![创建key](/assets/img/Snipaste_2022-12-12_20-31-10.png)

##### 6. Got it

![](/assets/img/Snipaste_2022-12-12_20-34-54.png)

