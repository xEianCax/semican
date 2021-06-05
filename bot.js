const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const db = require('quick.db');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const qdb = require('quick.db');
require('./util/eventLoader')(client);
let prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut kullanım için hazırlanıyor.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`${props.help.name} komutu kullanıma hazır.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  let theartistkullanicii = client.users.cache.get(msg.author.id)
  const cevapembed = new Discord.MessageEmbed()
  .setTitle(`👋🏻 Selamlar, saygılar! 👋🏻`)
  .setDescription(`Aleyküm selam. İyi eğlenceler!`)
  .setThumbnail(theartistkullanicii.displayAvatarURL())
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply(cevapembed);
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);


client.on("guildMemberAdd", member => {
      member.roles.add("eklenecek rol idsi") 
    }); //intentleri açın

client.on('guildMemberAdd', async member => {
let theartist = client.channels.cache.get("hoş geldin mesajı kanalınızın idsi")
theartist.send(`${member} sunucumuza katıldı! ${member.guild.memberCount} kişi olduk!`) 
  //intentleri açın
});

client.on("guildMemberRemove", async member => {
  let kanal = client.channels.cache.get("çıkış mesajı kanalınızın idsi")
  kanal.send(`**${member.user.tag} sunucudan ayrıldı!** **${member.guild.memberCount} kişi kaldık!** \n **Sunucumuzdaki kişi artışını desteklemek istiyorsan, daha fazla kişi davet edebilirsin!**`)
}) //intentleri açın