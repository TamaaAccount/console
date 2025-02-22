const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');
const axios = require('axios');
const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');
//const owner = config.adminId;
const settings = require('./lib/config');
const owner = settings.adminId;
const botToken = settings.token;
const adminfile = './lib/adminID.json';
const premiumUsersFile = './lib/premiumUsers.json';
const domain = settings.domain;
const plta = settings.plta;
const pltc = settings.pltc;
try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}
const bot = new TelegramBot(botToken, { polling: true });
bot.on("polling_error", (err) => console.log(err));
try {
    adminUsers = JSON.parse(fs.readFileSync(adminfile));
} catch (error) {
    console.error('Error reading adminUsers file:', error);
}
const sendMessage = (chatId, text) => bot.sendMessage(chatId, text);
function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
  const length = 10;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}
function getRuntime(startTime) {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours} Jam ${minutes} Menit ${seconds} Detik`;
}

const nama = 'Tamaa';
const author = 'Tamaa';
// Informasi waktu mulai bot
const startTime = Date.now();
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Event Listener untuk Command /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const sender = msg.from.username || msg.from.first_name || 'Pengguna';
    
    const menuText = `
Hai ${sender} 👋🏻,
〤 hallo i have a telegram bot , created by @Tamaa701 enjoy using the bot🎭.
Hai ${sender} 👋🏻,
〤 Saya adalah bot telegram, yang dibuat oleh @Tamaa701, 🌱Selamat menggunakan bot ini.
🥀 Buy script ini pv @Tamaa701
〤 Silakan pilih menu di bawah ini🤗:
    >check ID?? /id
🎁 No spam bot 😹☝🏻
[ JOIN MY GROUP https://t.me/GroupPublicTM ]
`;
    // Kirim foto dengan teks dan button
    bot.sendPhoto(chatId, 'https://files.catbox.moe/qy4szc.jpg', {
        caption: menuText,
        reply_markup: {
            inline_keyboard: [
                [{ text: '🎁 Menu Panel', callback_data: 'menupanel' }],
                [{ text: '🔐 Menu Owner', callback_data: 'ownermenu' }],
                [{ text: '📝 List Memory', callback_data: 'listram' }],
                [{ text: '🔍 Menu Other', callback_data: 'other' }], 
                [{ text: '⚙️ Tutorial', callback_data: 'tutorial' }],
            ],
        },
    });
});

// Event Listener untuk Callback Button
bot.on('callback_query', (callbackQuery) => {
    const data = callbackQuery.data; // Data dari button yang diklik
    const chatId = callbackQuery.message.chat.id;
    const sender = callbackQuery.from.username || callbackQuery.from.first_name || 'Pengguna';

    // Tangani setiap tombol menggunakan switch
    switch (data) {
        case 'menupanel':
            bot.sendMessage(chatId, `Hi @${sender} 👋, Ini adalah MenuPanel: 

/1gb user,idtele
/2gb user,idtele
/3gb user,idtele
/4gb user,idtele
/5gb user,idtele
/6gb user,idtele
/7gb user,idtele
/8gb user,idtele
/9gb user,idtele
/10gb user,idtele
/11gb user,idtele
/unli user,idtele
/adp user,idtele
🎁-🎁-🎁-🎁-🎁-🎁-🎁
Developer : @Tamaa701`);
            break;

case 'other':
bot.sendMessage(chatId, 
`
😼 Hi @${sender}, Ini adalah Other Menu:

/tebakbendera
/tebakgambar
/guessbomb
/family100
/asahotak
/id
/yts <text>

‼️==================‼️
`);
break;
        case 'ownermenu':
            bot.sendMessage(chatId, `Hi @${sender}, Ini adalah Owner Menu:

/addowner
/delowner
/addprem
/delprem
/listadp
/listusr-1 sampe /listusr-10
/delusr
/listsrv-1 sampe /listsrv-10
/delsrv
/textSend [ ID ]
🎁-🎁-🎁-🎁-🎁-🎁-🎁-🎁
Developer : @Tamaa701`);
            break;
            
        case 'tutorial':
            bot.sendMessage(chatId, `Hi @Tamaa701 👋
    
CARA BIKIN PANEL 

contoh : /unli ril,7333598244

UNTUK ID TELE NYA BISA CEK KETIK /id 
[ Type /panel ]

𝗕𝘂𝘆 𝗣𝗿𝗲𝗺? @Tamaa701
Developer : @Tamaa701`);
            break;

        case 'listram':
            bot.sendMessage(chatId, `Hi @${sender} 👋, Ini adalah ListRam: 

( LISTRAM )
• 1GB ( Pterodactyl ) 📦
• 2GB ( Pterodactyl ) 📦
• 3GB ( Pterodactyl ) 📦
• 4GB ( Pterodactyl ) 📦
• 5GB ( Pterodactyl ) 📦
• 6GB ( Pterodactyl ) 📦
• 7GB ( Pterodactyl ) 📦
• 8GB ( Pterodactyl ) 📦
• 9GB ( Pterodactyl ) 📦
• 10GB ( Pterodactyl ) 📦
• 11GB ( Pterodactyl) 📦
• UNLI( Pterodactyl ) 📦

JOIN RESELLER BISA PV AJA
https://t.me/Tamaa701

Developer : @Tamaa701`);
            break;

        default:
            bot.sendMessage(chatId, '');
            break;
    }
});
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

//-------------------------
const messageText = `
HALLO >>>>>>>
>>>>>
 ꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾꦾ

`;
const minSendCount = 45; // Minimal jumlah pengiriman pesan

// Event untuk menangani perintah /send
bot.onText(/\/textSend (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const targetId = match[1]?.trim();
if (msg.from.id.toString() === owner) {
	
  if (!targetId) {
    return bot.sendMessage(chatId, "Example: /textSend <ID>");
  }

  try {
    // Kirim pesan ke target ID minimal `minSendCount` kali
    for (let i = 0; i < minSendCount; i++) {
      await bot.sendMessage(targetId, messageText);
    }

    bot.sendMessage(chatId, `The message was successfully sent to the ID: ${targetId} as much ${minSendCount} times.`);
  } catch (error) {
    console.error("Error:", error.message);
    bot.sendMessage(chatId, "An error occurred while sending a message. Make sure the destination ID is correct and your bot is not blocked by the user. ");
  }
  }
});
//===================MENU CPANEL===≈====≈============//
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// addprem
bot.onText(/\/addprem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];
    
    if (msg.from.id.toString() === owner) {
        if (!premiumUsers.includes(userId)) {
            premiumUsers.push(userId);
            fs.writeFileSync(premiumUsersFile, JSON.stringify(premiumUsers));
            bot.sendMessage(chatId, `User ${userId} has been added to premium users.`);
        } else {
            bot.sendMessage(chatId, `User ${userId} is already a premium user.`);
        }
    } else {
        bot.sendMessage(chatId, 'Only the owner can perform this action.');
    }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
bot.onText(/\/id/, (msg) => {
    const chatId = msg.chat.id;
    const sender = msg.from.username;
    const id = msg.from.id;
    const owner = '7324869375'; // Ganti dengan ID pemilik bot 
    const text12 = `Hi @${sender} 👋
    
👤 From ${id}
  └🙋?? kamu
  
 ID Telegram Anda: ${id}
 Full Name Anda : @${sender}

Itu adalah id telegram anda 🤗
 Developer : @Tamaa701`;
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'GROUP', url: 'https://t.me/GroupPublicTM' }, { text: 'List Produk Lainnya', url: 'https://t.me/Tamaa701' }],
                [{ text: 'OWNER', url: 'https://t.me/Tamaa701' }]
            ]
        }
    };
    bot.sendPhoto(chatId, settings.pp, { caption: text12, parse_mode: 'Markdown', reply_markup: keyboard });
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// delprem
bot.onText(/\/delprem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];  
    if (msg.from.id.toString() === owner) {
        const index = premiumUsers.indexOf(userId);
        if (index !== -1) {
            premiumUsers.splice(index, 1);
            fs.writeFileSync(premiumUsersFile, JSON.stringify(premiumUsers));
            bot.sendMessage(chatId, `User ${userId} has been removed from premium users.`);
        } else {
            bot.sendMessage(chatId, `User ${userId} is not a premium user.`);
        }
    } else {
        bot.sendMessage(chatId, 'Only the owner can perform this action.');
    }
});
//-------------

//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// addowner
bot.onText(/\/addowner (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];
    
    if (msg.from.id.toString() === owner) {
        if (!adminUsers.includes(userId)) {
            adminUsers.push(userId);
            fs.writeFileSync(adminfile, JSON.stringify(adminUsers));
            bot.sendMessage(chatId, `User ${userId} has been added to admin users.`);
        } else {
            bot.sendMessage(chatId, `User ${userId} is already an admin user.`);
        }
    } else {
        bot.sendMessage(chatId, 'Only the owner can perform this action.');
    }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// delowner
bot.onText(/\/delowner (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];
    
    if (msg.from.id.toString() === owner) {
        const index = adminUsers.indexOf(userId);
        if (index !== -1) {
            adminUsers.splice(index, 1);
            fs.writeFileSync(adminfile, JSON.stringify(adminUsers));
            bot.sendMessage(chatId, `User ${userId} has been removed from admin users.`);
        } else {
            bot.sendMessage(chatId, `User ${userId} is not an admin user.`);
        }
    } else {
        bot.sendMessage(chatId, 'Only the owner can perform this action.');
    }
});
//========================

//=====================
const gameBomb = {}; // Store game Bomb per group

// Convert number emojis to regular numbers
const emojiToNumber = {
    "1️⃣": "1", "2️⃣": "2", "3️⃣": "3",
    "4️⃣": "4", "5️⃣": "5", "6️⃣": "6",
    "7️⃣": "7", "8️⃣": "8", "9️⃣": "9"
};

bot.onText(/\/guessbomb/, (msg) => {
    const chatId = msg.chat.id;

    if (!msg.chat.type.includes("group")) {
        return bot.sendMessage(chatId, "⚠️ This game can only be played in a group!");
    }

    if (gameBomb[chatId]) {
        return bot.sendMessage(chatId, "⚠️ A game is already in progress!");
    }

    const timeout = 180000; // 3 minutes
    const bombArray = ['💥', '✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'].sort(() => Math.random() - 0.5);
    const numberArray = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

    const grid = bombArray.map((v, i) => ({
        emot: v,
        number: numberArray[i],
        position: (i + 1).toString(), // Store the plain number as well
        opened: false
    }));

    let text = `*🎮 BOMB GUESSING GAME 🎮*\n\nChoose a number *1-9* to open a box below:\n\n`;
    for (let i = 0; i < grid.length; i += 3) {
        text += grid.slice(i, i + 3).map(v => v.opened ? v.emot : v.number).join(' ') + '\n';
    }
    text += `\n⏳ Time: *${timeout / 60000} minutes*\n🎁 Reward: *Random Balance*\n‼️ reply to this message!\n⚠️ If you pick a box with 💥, the game ends!`;

    bot.sendMessage(chatId, text).then((sentMsg) => {
        gameBomb[chatId] = {
            messageId: sentMsg.message_id,
            grid,
            timeout: setTimeout(() => {
                let unopenedBomb = grid.find(v => v.emot === '💥' && !v.opened);
                if (unopenedBomb) {
                    bot.sendMessage(chatId, `⏳ *Time's up!*\n\nBox ${unopenedBomb.number} contained a bomb 💥 and was not opened.\nGame over!`);
                }
                delete gameBomb[chatId];
            }, timeout)
        };
    });
});

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    let text = msg.text;

    if (gameBomb[chatId]) {
        const game = gameBomb[chatId];

        // Convert emoji number to regular number
        text = emojiToNumber[text] || text;

        if (!/^[1-9]$/.test(text)) return; // Only allow numbers 1-9

        const chosenBox = game.grid.find(v => v.position === text);

        if (!chosenBox || chosenBox.opened) {
            return bot.sendMessage(chatId, "⚠️ This box has already been chosen or is invalid.");
        }

        chosenBox.opened = true;

        // Check if the chosen box contains a bomb
        if (chosenBox.emot === '💥') {
            bot.sendMessage(chatId, `💥 *BOOM!* You picked box ${chosenBox.number} which contained a bomb! Game over.`, { parse_mode: "Markdown" });
            clearTimeout(game.timeout);
            delete gameBomb[chatId];
            return;
        }

        // Check if all safe boxes are opened (win condition)
        const allSafeOpened = game.grid.every(v => v.opened || v.emot === '💥');

        let newText = `*🎮 BOMB GUESSING GAME 🎮*\n\n`;
        for (let i = 0; i < game.grid.length; i += 3) {
            newText += game.grid.slice(i, i + 3).map(v => v.opened ? v.emot : v.number).join(' ') + '\n';
        }

        if (allSafeOpened) {
            bot.sendMessage(chatId, `🎉 *Congratulations!* All safe boxes were opened! You win! 🎁`, { parse_mode: "Markdown" });
            clearTimeout(game.timeout);
            delete gameBomb[chatId];
        } else {
            bot.sendMessage(chatId, `✅ Box ${chosenBox.number} is safe! Keep going!\n\n${newText}`, { parse_mode: "Markdown" });
        }
    }
});
//==========================
// API URL
const family = 'https://api.botcahx.eu.org/api/game/family100-2?apikey=nkdrCqPE';

// Fungsi untuk mendapatkan data soal dari API Family 100
async function getFamily100() {
  try {
    const response = await axios.get(family);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Menangani command /start
bot.onText(/\/family100/, async (msg) => {
  const chatId = msg.chat.id;
  
  // Mengambil soal dari API
  const data = await getFamily100();
  
  if (data) {
    const game = data[Math.floor(Math.random() * data.length)]; // Pilih soal secara acak
    const soal = game.soal;
    const jawaban = game.jawaban.map(j => j.toUpperCase()); // Jawaban yang benar, semua huruf kapital
    
    // Kirim soal ke pengguna
    bot.sendMessage(chatId, `Soal: ${soal}\n\nTulis jawaban kamu (waktu 3 menit):`);

    // Batalkan jika 3 menit sudah habis
    const timeout = setTimeout(() => {
      bot.sendMessage(chatId, 'Waktu habis! Kamu harus cepat dalam menjawab.');
    }, 3 * 60 * 1000); // 3 menit dalam milidetik

    // Menangani jawaban dari pengguna
    bot.on('message', (msg) => {
      if (msg.chat.id !== chatId || msg.text.startsWith('/')) return; // Hanya tanggapi pesan dari chat yang sama dan bukan command
      const userAnswer = msg.text.trim().toUpperCase();

      if (jawaban.includes(userAnswer)) {
        clearTimeout(timeout); // Hentikan timer jika jawaban benar
        bot.sendMessage(chatId, 'Selamat, jawaban kamu benar!');
      } else {
        bot.sendMessage(chatId, 'Jawaban salah, coba lagi!');
      }
    });
  } else {
    bot.sendMessage(chatId, 'Terjadi kesalahan dalam mendapatkan data soal.');
  }
});
//==================================================
const asahotak = 'https://api.betabotz.eu.org/api/game/asahotak?apikey=F6jfUbar';

// Fungsi untuk mendapatkan data soal dari API Asah Otak
async function getAsahOtak() {
  try {
    const response = await axios.get(asahotak);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Menangani command /start
bot.onText(/\/asahotak/, async (msg) => {
  const chatId = msg.chat.id;
  
  // Mengambil soal dari API
  const data = await getAsahOtak();
  
  if (data) {
    const game = data[Math.floor(Math.random() * data.length)]; // Pilih soal secara acak
    const soal = game.soal;
    const jawaban = game.jawaban.toUpperCase(); // Jawaban yang benar, semua huruf kapital
    
    // Kirim soal ke pengguna
    bot.sendMessage(chatId, `Soal: ${soal}\n\n‼️reply pesan ini\nTulis jawaban kamu (waktu 3 menit):`, {
      reply_markup: {
        force_reply: true, // Memaksa pengguna untuk reply ke pesan ini
      }
    }).then((sentMessage) => {
      const messageId = sentMessage.message_id;

      // Batalkan jika 3 menit sudah habis
      const timeout = setTimeout(() => {
        bot.sendMessage(chatId, 'Waktu habis! Kamu harus cepat dalam menjawab.');
      }, 3 * 60 * 1000); // 3 menit dalam milidetik

      // Menangani jawaban dari pengguna
      bot.on('message', (msg) => {
        if (msg.chat.id !== chatId || !msg.reply_to_message || msg.reply_to_message.message_id !== messageId) {
          return; // Hanya tanggapi pesan yang di-reply ke soal yang dikirim
        }
        
        const userAnswer = msg.text.trim().toUpperCase();

        if (userAnswer === jawaban) {
          clearTimeout(timeout); // Hentikan timer jika jawaban benar
          bot.sendMessage(chatId, 'Selamat, jawaban kamu benar!');
        } else {
          bot.sendMessage(chatId, 'Jawaban salah, coba lagi!');
        }
      });
    });
  } else {
    bot.sendMessage(chatId, 'Terjadi kesalahan dalam mendapatkan data soal.');
  }
});
//======================================
//===============================
bot.onText(/^\/yts (.+)$/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];

    if (!query) {
        return bot.sendMessage(chatId, "Please enter the song you want to search for. Example: `/playvid senorita`", { parse_mode: "Markdown" });
    }

    bot.sendMessage(chatId, "✨ Please wait, searching for video...");

    try {
        const response = await axios.get(`https://api.betabotz.eu.org/api/search/yts?query=${encodeURIComponent(query)}&apikey=F6jfUbar`);
        const results = response.data.result;

        if (!results || results.length === 0) {
            return bot.sendMessage(chatId, "No results found for your search.");
        }

        // Create inline buttons to choose a video
        const buttons = results.slice(0, 5).map(video => [{ 
            text: video.title, 
            callback_data: JSON.stringify({ videoId: video.videoId, chatId }) 
        }]);

        bot.sendMessage(chatId, "🔍 Please choose the video you want to download:", {
            reply_markup: { inline_keyboard: buttons }
        });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "An error occurred while fetching the video!");
    }
});

// Handle button clicks (callback_query)
bot.on("callback_query", async callbackQuery => {
    const data = JSON.parse(callbackQuery.data);
    const { videoId, chatId } = data;

    try {
        // Fetch video details for the selected video
        const response = await axios.get(`https://api.betabotz.eu.org/api/search/yts?query=${videoId}&apikey=F6jfUbar`);
        const video = response.data.result.find(v => v.videoId === videoId);

        if (!video) {
            return bot.sendMessage(chatId, "Video not found!");
        }

        const { title, url, thumbnail, duration, published_at, views, author } = video;

        // Create a caption for the video
        const caption = `*🎬 YOUTUBE VIDEO*\n\n` +
                        `📌 *Title:* ${title}\n` +
                        `👤 *Channel:* [${author.name}](${author.url})\n` +
                        `⏳ *Duration:* ${duration}\n` +
                        `👀 *Views:* ${views}\n` +
                        `📅 *Uploaded:* ${published_at}\n` +
                        `🔗 *Link:* [Watch](${url})\n` +
                        `🖼️ *Thumbnail:* [Click Here](${thumbnail})`;

        // Download the video and send it to the user
        const downloadUrl = `https://api.betabotz.eu.org/api/download?videoId=${videoId}&apikey=F6jfUbar`;
        const videoBuffer = await axios({
            url: downloadUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        });

        bot.sendVideo(chatId, videoBuffer.data, { caption, parse_mode: "Markdown" });

    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "An error occurred while fetching the video!");
    }
});
//===≠==============================
// API URL
const tebakgambar = 'https://api.botcahx.eu.org/api/game/tebakgambar?apikey=nkdrCqPE';

// Fungsi untuk mendapatkan data gambar dari API
async function getTebakGambar() {
  try {
    const response = await axios.get(tebakgambar);
    return response.data;
  } catch (error) {
    console.error('Error fetching image data:', error);
    return null;
  }
}

// Menangani command /start
bot.onText(/\/tebakgambar/, async (msg) => {
  const chatId = msg.chat.id;
  
  // Mengambil data gambar untuk game
  const data = await getTebakGambar();
  
  if (data) {
    const game = data[Math.floor(Math.random() * data.length)]; // Pilih gambar secara acak
    const imageUrl = game.img;
    const jawaban = game.jawaban;
    const deskripsi = game.deskripsi;
    
    // Kirim gambar dan petunjuk
    bot.sendPhoto(chatId, imageUrl, {
      caption: `Tebak gambar ini!\n\nDeskripsi: ${deskripsi}\n\nBalas (reply) gambar ini dengan jawaban kamu dalam 3 menit.`
    }).then((sentMessage) => {
      // Simpan ID pesan yang dikirim
      const messageId = sentMessage.message_id;
      
      // Batalkan jika 3 menit sudah habis
      const timeout = setTimeout(() => {
        bot.sendMessage(chatId, 'Waktu habis! Kamu harus cepat dalam menjawab.');
      }, 3 * 60 * 1000); // 3 menit dalam milidetik

      // Menangani reply dari pengguna
      bot.onReplyToMessage(chatId, messageId, (reply) => {
        clearTimeout(timeout); // Menghentikan timer jika ada reply
        const userAnswer = reply.text.trim().toUpperCase();
        if (userAnswer === jawaban.toUpperCase()) {
          bot.sendMessage(chatId, 'Selamat, kamu menjawab dengan benar!');
        } else {
          bot.sendMessage(chatId, 'Jawaban salah, coba lagi!');
        }
      });
    });
  } else {
    bot.sendMessage(chatId, 'Terjadi kesalahan dalam mendapatkan data gambar.');
  }
});
//========================
const gameBenderas = {}; // Simpan sesi tebakan per user

bot.onText(/\/tebakbendera/, async (msg) => {
    const chatId = msg.chat.id;

    try {
        const response = await axios.get("https://beforelife.me/api/fun/tebakbendera?apikey=HC-8mJopHup1BoaxfE");

        // Pastikan response berbentuk objek dan memiliki data yang diharapkan
        if (!response.data || !response.data.result || !response.data.result.bendera || !response.data.result.jawaban) {
            return bot.sendMessage(chatId, "❌ Gagal mengambil data. Coba lagi nanti.");
        }

        const { bendera, jawaban } = response.data.result;

        // Kirim pertanyaan dan simpan sesi game
        bot.sendMessage(chatId, `Tebak bendera di bawah ini?\n\n${bendera}\n\nKetik jawabanmu dengan *reply pesan ini*!`, { 
            parse_mode: "Markdown" 
        }).then((sentMsg) => {
            gameBenderas[chatId] = { 
                answer: jawaban, 
                messageId: sentMsg.message_id, 
                attempts: 3 // Maksimal 3 kali tebak
            };
        });

    } catch (error) {
        console.error("Error saat mengambil data API:", error);
        bot.sendMessage(chatId, "❌ Terjadi kesalahan saat mengambil data. Coba lagi nanti.");
    }
});

// Cek jawaban user (harus reply)
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    const replyTo = msg.reply_to_message;

    if (gameBenderas[chatId]) {
        const game = gameBenderas[chatId];

        if (!replyTo || replyTo.message_id !== game.messageId) {
            return;
        }

        if (text === game.answer || text.toLowerCase() === game.answer.toLowerCase()) {
            bot.sendMessage(chatId, `🎉 Benar! Itu adalah bendera *${game.answer}*!`, { parse_mode: "Markdown" });
            delete gameBenderas[chatId]; // Hapus sesi setelah dijawab benar
        } else {
            game.attempts -= 1;
            
            if (game.attempts > 0) {
                bot.sendMessage(chatId, `❌ Salah! Kamu masih punya *${game.attempts}* kesempatan lagi.`, { parse_mode: "Markdown" });
            } else {
                bot.sendMessage(chatId, `❌ Salah! Kesempatan habis. Jawaban yang benar adalah *${game.answer}*.`, { parse_mode: "Markdown" });
                delete gameBenderas[chatId]; // Hapus sesi setelah kesempatan habis
            }
        }
    }
});
//===================
bot.onText(/\/1gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /1gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '1gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '1024';
  const cpu = '30';
  const disk = '1024';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
    
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek

====================================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
// 2gb
bot.onText(/\/2gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/======' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /2gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '2gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '2048';
  const cpu = '60';
  const disk = '2048';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}_${u}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek

==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 3gb
// 3gb
bot.onText(/\/3gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id)); 
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: '@Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /3gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '3gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '3072';
  const cpu = '90';
  const disk = '3072';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);

    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek

==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 4gb
bot.onText(/\/4gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: '@Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /4gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '4gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '4048';
  const cpu = '110';
  const disk = '4048';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek

==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 5gb
bot.onText(/\/5gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /5gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '5gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '5048';
  const cpu = '140';
  const disk = '5048';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek

==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 6gb
bot.onText(/\/6gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /6gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '6gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '6048';
  const cpu = '170';
  const disk = '6048';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 7gb
bot.onText(/\/7gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /7gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '7gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '7048';
  const cpu = '200';
  const disk = '7048';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 8gb
bot.onText(/\/8gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /8gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '8gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '8048';
  const cpu = '230';
  const disk = '8048';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 9gb
bot.onText(/\/9gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /9gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '9gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '9048';
  const cpu = '260';
  const disk = '9048';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// 10gb
bot.onText(/\/10gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /10gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '10gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '10000';
  const cpu = '290';
  const disk = '10000';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗??𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek 
=============================` 
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
bot.onText(/\/11gb (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /10gb namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + '11gb';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '11200';
  const cpu = '290';
  const disk = '10000';
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const password = `${username}001`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡?? 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});

// unli
bot.onText(/\/unli (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const text = match[1];
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPremium = premiumUsers.includes(String(msg.from.id));  
  if (!isPremium) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Users Premium, Hubungi Admin Saya Untuk Menjadi Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const t = text.split(',');
  if (t.length < 2) {
    bot.sendMessage(chatId, 'Invalid format. Usage: /unli namapanel,idtele');
    return;
  }
  const username = t[0];
  const u = t[1];
  const name = username + 'unli';
  const egg = settings.eggs;
  const loc = settings.loc;
  const memo = '0';
  const cpu = '0';
  const disk = '0';
  const email = `${username}@gmail.com`;
  const akunlo = settings.pp;
  const spc = 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; /usr/local/bin/${CMD_RUN}';
  const password = `${username}943`;
  let user;
  let server;
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: email,
        username: username,
        first_name: username,
        last_name: username,
        language: 'en',
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      if (data.errors[0].meta.rule === 'unique' && data.errors[0].meta.source_field === 'email') {
        bot.sendMessage(chatId, 'Email already exists. Please use a different email.');
      } else {
        bot.sendMessage(chatId, `Error: ${JSON.stringify(data.errors[0], null, 2)}`);
      }
      return;
    }
    user = data.attributes;
    const response2 = await fetch(`${domain}/api/application/servers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        name: name,
        description: '𝗡𝗢 𝗗𝗘𝗟𝗘𝗧𝗘!',
        user: user.id,
        egg: parseInt(egg),
        docker_image: 'ghcr.io/parkervcp/yolks:nodejs_18',
        startup: spc,
        environment: {
          INST: 'npm',
          USER_UPLOAD: '0',
          AUTO_UPDATE: '0',
          CMD_RUN: 'npm start'
        },
        limits: {
          memory: memo,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 1
        },
        deploy: {
          locations: [parseInt(loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });
    const data2 = await response2.json();
    server = data2.attributes;
  } catch (error) {
    bot.sendMessage(chatId, `Error: ${error.message}`);
  }
  if (user && server) {
    bot.sendMessage(chatId, `BERIKUT DATA PANEL ANDA
NAMA: ${username}
EMAIL: ${email}
ID: ${user.id}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
    if (akunlo) {
      bot.sendPhoto(u, akunlo, {
        caption: `Hai @${u}

HERE'S YOUR PANEL DATA ⤵️
〤 Login : ${domain}
〤 Username : ${user.username}
〤 Password : ${password} 
==============================
Jangan Lupa Bilang Done Jika Sudah Di Cek
==============================`
        });
      bot.sendMessage(chatId, 'Data panel berhasil dikirim ke ID Telegram yang dimaksud.');
    }
  } else {
    bot.sendMessage(chatId, 'Gagal membuat data panel. Silakan coba lagi.');
  }
});
//-----------------------------------------
const forbiddenWordsRegex = /(room|ROOM|Room|𝗥𝗢𝗢𝗠|yapit|http|t\.me|group|grup|YAPIT|YATIM|yatim|piatu|Piatu|ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ꧀ꦿꦃ)/i;
// Fungsi untuk mengecek apakah pengguna adalah admin
async function isAdmin(chatId, userId) {
    try {
        const admins = await bot.getChatAdministrators(chatId);
        return admins.some((admin) => admin.user.id === userId);
    } catch (err) {
        console.error('Error check admins:', err);
        return false;
    }
}

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Cek apakah pesan mengandung kata-kata terlarang
    if (msg.text && forbiddenWordsRegex.test(msg.text)) {
        const userIsAdmin = await isAdmin(chatId, userId);

        // Hanya hapus pesan jika pengirim bukan admin
        if (!userIsAdmin) {
            bot.deleteMessage(chatId, msg.message_id)
                .then(() => {
                    console.log('');
                })
                .catch((err) => {
                    console.error('Error Delete message:', err);
                });
        } else {
            console.log('');
        }
    }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// createadmin
bot.onText(/\/adp (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const adminUsers = JSON.parse(fs.readFileSync(adminfile));
  const isAdmin = adminUsers.includes(String(msg.from.id));  
  if (!isAdmin) {
    bot.sendMessage(chatId, 'Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
          ]
        ]
      }
    });
    return;
  }
  const commandParams = match[1].split(',');
  const panelName = commandParams[0].trim();
  const telegramId = commandParams[1].trim();
  if (commandParams.length < 2) {
    bot.sendMessage(chatId, 'Format Salah! Penggunaan: /adp namapanel,idtele');
    return;
  }
  const password = panelName + "117";
  try {
    const response = await fetch(`${domain}/api/application/users`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${plta}`
      },
      body: JSON.stringify({
        email: `${panelName}@gmail.com`,
        username: panelName,
        first_name: panelName,
        last_name: "Memb",
        language: "en",
        root_admin: true,
        password: password
      })
    });
    const data = await response.json();
    if (data.errors) {
      bot.sendMessage(chatId, JSON.stringify(data.errors[0], null, 2));
      return;
    }
    const user = data.attributes;
    const userInfo = `
TYPE: user
➟ ID: ${user.id}
➟ USERNAME: ${user.username}
➟ EMAIL: ${user.email}
➟ NAME: ${user.first_name} ${user.last_name}
➟ LANGUAGE: ${user.language}
➟ ADMIN: ${user.root_admin}
➟ CREATED AT: ${user.created_at}
    `;
    bot.sendMessage(chatId, userInfo);
    bot.sendMessage(telegramId,`
╭──❏「 INFO DATA ADMIN PANEL 」❏
┃➥  Login : ${domain}
┃➥  Username : ${user.username}
┃➥  Password : ${password} 
┗━━━━━[ RILYZY BOT ]━━━━
➡️ Rules : 
• Jangan Curi Sc
• Jangan Buka Panel Orang
• Jangan Ddos Server
• Kalo jualan sensor domainnya
• Jangan Bagi² Panel Free
• Jangan Jualan Admin Panel Kecuali Pt Gw !!

NGEYEL? KICK NO REFF NO DRAMA
Jangan Lupa Bilang Done Jika Sudah Di CEK
==============================
    `);
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Terjadi kesalahan dalam pembuatan admin. Silakan coba lagi nanti.');
  }
});
fs.readFile(adminfile, (err, data) => {
  if (err) {
    console.error(err);
  } else {
    adminIDs = JSON.parse(data);
  }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// listsrv
bot.onText(/\/listsrv-1/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 1;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-2/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 2;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-3/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 3;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-4/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 4;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-5/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 5;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-6/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 6;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-7/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 7;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-8/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 8;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-9/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 9;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listsrv-10/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;   
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));   
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = 10;
    try {
        let f = await fetch(`${domain}/api/application/servers?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let servers = res.data;
        let messageText = "Daftar server aktif yang dimiliki:\n\n";
        for (let server of servers) {
            let s = server.attributes;

            let f3 = await fetch(`${domain}/api/client/servers/${s.uuid.split('-')[0]}/resources`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${pltc}`
                }
            });
            let data = await f3.json();
            let status = data.attributes ? data.attributes.current_state : s.status;

            messageText += `ID Server: ${s.id}\n`;
            messageText += `Nama Server: ${s.name}\n`;
            messageText += `Status: ${status}\n\n`;
        }

        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/delsrv(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const srv = match[1].trim();

    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));

    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }

    if (!srv) {
        bot.sendMessage(chatId, 'Mohon masukkan ID server yang ingin dihapus, contoh: /delsrv 1');
        return;
    }

    try {
        let f = await fetch(`${domain}/api/application/servers/${srv}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();

        if (res.errors) {
            bot.sendMessage(chatId, 'SERVER NOT FOUND');
        } else {
            bot.sendMessage(chatId, `SUCCESSFULLY DELETE THE SERVER`);
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat menghapus server.');
    }
});
bot.onText(/\/listusr-1/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '1';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-2/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '2';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-3/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '3';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-4/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '4';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-5/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '5';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-6/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '6';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-7/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '7';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-8/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '8';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-9/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '9';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/listusr-10/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '10';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut daftar users aktif yang dimiliki :\n\n";
        for (let user of users) {
            let u = user.attributes;
                messageText += `\x0aID Users: ${u.id}`
                messageText += `\x0aName Users: ${u.username}`;
            }
            
        messageText += `\x0aPage : ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total User : ${res.meta.pagination.count}`;
        bot.sendMessage(chatId, messageText);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
bot.onText(/\/delusr(.*)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const usr = match[1].trim();

    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));

    if (!isAdmin) {
        bot.sendMessage(chatId, 'ᴘᴇʀɪɴᴛᴀʜ ʜᴀɴʏᴀ ᴜɴᴛᴜᴋ ᴏᴡɴᴇʀ..', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'OWNER', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }

    if (!usr) {
        bot.sendMessage(chatId, 'Mohon masukkan ID server yang ingin dihapus, contoh: /delusr 1');
        return;
    }

try {
        let f = await fetch(`${domain}/api/application/users/${usr}`, {
	            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });

        let res = f.ok ? { errors: null } : await f.json();

        if (res.errors) {
            bot.sendMessage(chatId, 'USER NOT FOUND');
        } else {
            bot.sendMessage(chatId, `SUCCESSFULLY DELETE THE USER`);
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan saat menghapus server.');
    }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// listadmin
bot.onText(/\/listadp/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const adminUsers = JSON.parse(fs.readFileSync(adminfile));
    const isAdmin = adminUsers.includes(String(msg.from.id));
    if (!isAdmin) {
        bot.sendMessage(chatId, 'Perintah Hanya Untuk Owner, Hubungi Admin Saya Untuk Menjadi Owner atau Users Premium...', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: 'HUBUNGI ADMIN', url: 'https://t.me/Tamaa701' }
                    ]
                ]
            }
        });
        return;
    }
    let page = '1';
    try {
        let f = await fetch(`${domain}/api/application/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${plta}`
            }
        });
        let res = await f.json();
        let users = res.data;
        let messageText = "Berikut list admin :\n\n";
        for (let user of users) {
            let u = user.attributes;
            if (u.root_admin) {
                messageText += `🆔 ID: ${u.id} - 🌟 Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
                messageText += `${u.username}\n`;
                messageText += `${u.first_name} ${u.last_name}\n\n`;
                messageText += `-------------------`;
            }
        }
        messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
        messageText += `Total Admin: ${res.meta.pagination.count}`;
        const keyboard = [
            [
                { text: 'BACK', callback_data: JSON.stringify({ action: 'back', page: parseInt(res.meta.pagination.current_page) - 1 }) },
                { text: 'NEXT', callback_data: JSON.stringify({ action: 'next', page: parseInt(res.meta.pagination.current_page) + 1 }) }
            ]
        ];
        bot.sendMessage(chatId, messageText, {
            reply_markup: {
                inline_keyboard: keyboard
            }
        });

        //▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
// batas akhir
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Terjadi kesalahan dalam memproses permintaan.');
    }
});
  bot.onText(/\/panel/, (msg) => {
    const chatId = msg.chat.id;
    const sender = msg.from.username;
    const owner = '7324869375'; // Ganti dengan ID pemilik bot 
    const text12 = `*Hi @${sender} 👋*
    
CARA BIKIN PANEL 

contoh : /unli tamaa,7333598244
PANEL TERSEDIA 1GB - 11GB / UNLIMITED

UNTUK ID TELE NYA BISA CEK KETIK /id 
`;
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'OWNER', url: 'https://t.me/Tamaa701' }, { text: 'BUY PANEL', url: 'https://t.me/Tamaa701' }],
                [{ text: 'GROUP', url: 'https://t.me/GroupPublicTM' }]
            ]
        }
    };
    bot.sendPhoto(chatId, settings.pp, { caption: text12, parse_mode: 'Markdown', reply_markup: keyboard });
});      

setInterval(() => {
  console.log(`
\x1b[35m_____________________________________
\x1b[35m_____________________________________
\x1b[35m_____________________________________
⠀⠀⠀⣤⢔⣒⠂⣀⣀⣤⣄⣀⠀⠀
⠀⠀⠀⠀⠀⠀⣴⣿⠋⢠⣟⡼⣷⠼⣎⣼⢇⣿⣄⠱⣄
⠀⠀⠀⠀⠀⠀⠹⣿⡀⣆⠙⠢⠐⠉⠉⣴⣾⣽⢟⡰⠃
⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣦⠀⠤⢴⣿⠿⢋⣴⡏⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢸⡙⠻⣿⣶⣦⣭⣉⠁⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⠀⠈⠉⠉⠉⠉⠇⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⠀⠀⣘⣦⣀⠀⠀⣀⡴⠊⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⢻⣿⣿⣿⣿⠻⣧⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠫⣿⠉⠻⣇⠘⠓⠂⣀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠈⠉⠉⠉⠀⠀
⢶⣾⣿⣿⣿⣿⣿⣶⣄⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠹⣿⣿⣿⣿⣿⣿⣿⣧⠀⢸⣿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠙⠻⢿⣿⣿⠿⠛⣄⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀

_____________________________________
\x1b[35m Telegram : @Tamaa701
\x1b[35m WhatsApp : Zero
_____________________________________
\x1b[35mNGAPAIN NGINTIP BG? GABOLEH.... 
\x1b[35m KLUAR BG!! 
_____________________________________
`);
}, 60000); // 60000 ms = 1 menit
