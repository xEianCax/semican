const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
var aktivitecik = [
        "sj",
        "sjj",
        "sjsj"
    ];

    setInterval(function() {

        var random = Math.floor(Math.random()*(aktivitecik.length-0+1)+0);

        client.user.setActivity(aktivitecik[random], "" );
        client.user.setActivity(`sj`, {type: "STREAMING"});
        }, 2 * 2500);
    
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] bot aktif`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] botun ismi ${client.user.username}`);
  client.user.setStatus("dnd");
};