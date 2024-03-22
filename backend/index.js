require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const webAppUrl = 'https://js-eatme-11-fruits.vercel.app/';

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'The form is below, please fill out all fields', {
            reply_markup: {
                keyboard: [
                    [{ text: 'fill form', web_app: { url: webAppUrl } }]
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



});

