const { MessageEmbed } = require("discord.js");
const { DEFUALT_COLOR } = process.env;

module.exports.run = async(client, message, args) => {

    let checkaccessEmbed = new Discord.MessageEmbed()
        .setTitle(`[⚙️] -> Check Access <- [⚙️]`)
        .setColor(DEFUALT_COLOR)
        .setDescription(`[✅] -> You Have Access To View The Applications!`)
        .setFooter(`Made With ❤️ By HirboSH`)
        .setTimestamp();

    message.channel.send(checkaccessEmbed);

}
module.exports.help = {
    name:"checkaccess"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    teamOnly: true
}
