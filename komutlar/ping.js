const Discord = require("discord.js")

exports.run = async(client, message, args) => {
    let embedd = new Discord.MessageEmbed()
.setDescription(`<@${message.author.id}>, botun pingi hemen hesaplanıyor...`)
.setColor("BLACK")

let botunpingi = message.client.ws.ping;

message.channel.send(embedd).then(m => {

let embed = new Discord.MessageEmbed()

if (botunpingi < 100) {
embed.setDescription(`🟢 Pingim: ${botunpingi}`)
embed.setColor("GREEN")
embed.setImage(`https://dummyimage.com/300x200/36393f/ffffff.png&text=Pingim:`+ `${botunpingi}`)
}

if (botunpingi > 101 && botunpingi < 249) {
embed.setDescription(`🟡 Pingim: ${botunpingi}`)
embed.setColor("YELLOW")
embed.setImage(`https://dummyimage.com/300x200/36393f/ffffff.png&text=Pingim:`+ `${botunpingi}`)
}

if (botunpingi > 250 && botunpingi < 351) {
embed.setDescription(`🔴 Pingim: ${botunpingi}`)
embed.setColor("RED")
embed.setImage(`https://dummyimage.com/300x200/36393f/ffffff.png&text=Pingim:`+ `${botunpingi}`)
}

m.edit(embed)
})
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['pong'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ping',
    description: 'resimli renkli ping komutu',
    usage: 'ping'
  };