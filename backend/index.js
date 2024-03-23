require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

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

