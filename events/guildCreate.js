const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
client.on('guildCreate', guild => {
    const varsayilankanalcik = guild.defaultChannel
   varsayilankanalcik.sendMessage("sa eklendim")
	client.user.setActivty(prefix + 'yardım');
})