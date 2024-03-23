require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

//const webAppUrl = 'https://js-eatme-11-fruits.vercel.app/';
const webAppUrl = 'https://js-telegram-bot-01.vercel.app/';

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'The form is below, please fill out all fields', {
            reply_markup: {
                keyboard: [
                    [{ text: 'fill form', web_app: { url: webAppUrl + 'form' } }]
                ]
            }
        });

        await bot.sendMessage(chatId, 'Welcome to our website app', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Send Request', web_app: { url: webAppUrl } }]
                ]
            }
        });
    }

    if (msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data);
            await bot.sendMessage(chatId, 'Thanks for your letter!');
            await bot.sendMessage(chatId, 'You name is:' + data?.name);
            await bot.sendMessage(chatId, 'You email is:' + data?.email);
            await bot.sendMessage(chatId, 'You city is:' + data?.city);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'We Call You. Please wait a little.');
            }, 3000);
        } catch (error) {
            console.log(error.message);
        }
    }

});

app.post('/web-data', async (req, res) => {
    const { queryId, products, totalPrice } = req.body;

    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Success Buying',
            input_message_content: {
                message_text: 'Thank you for buying our products!'
            }
        });

        return res.status(200).json({});
    } catch (error) {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Fail Buying',
            input_message_content: {
                message_text: 'Have an error when buying our products. Try one more time..'
            }
        });

        return res.status(500).json({});
    }
});

const PORT = 8000;

app.listen(PORT, () => console.log('server running on port 8000'));