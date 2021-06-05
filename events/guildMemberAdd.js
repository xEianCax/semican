module.exports = member => {
    let guild = member.guild;
    member.send('niye geldin');
    guild.defaultChannel.send(`${member.user.username} geldi.`);
  };  