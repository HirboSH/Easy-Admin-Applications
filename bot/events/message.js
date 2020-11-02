const { Team } = require("../config/config.js");

module.exports = (client, message) => {

    if (message.author.bot) return;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(client.prefix.length).toLowerCase();
    const cmd = client.commands.get(command);

    if (!message.content.toLowerCase().startsWith(client.prefix)) return;

    if (!cmd) return;
    if (!message.guild.me.permissions.has(["SEND_MESSAGES"])) return;

    if (cmd.requirements.teamOnly && !Team.includes(message.author.id))
        return message.reply("Only The Applications Team Can Use This Command !");
    
    if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms))
        return message.reply(`You Must Have The Following Permissions : ${missingPerms(message.member, cmd.requirements.userPerms)}`);
    
    if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms))
        return message.reply(`I Am Missing The Following Permissions ${missingPerms(message.guild.me, cmd.requirements.client)}`);
    
    cmd.run(client, message, args);

}

const missingPerms = (member, perms) => {
    const missingPerms = member.permissions.missing(perms)
        .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);
    
    return missingPerms.length > 1 ?
        `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
        missingPerms[0];
}
