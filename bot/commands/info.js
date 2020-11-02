const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    let infoEmbed = new Discord.MessageEmbed()

        .setTitle(`[⚙️] -> Info <- [⚙️]`)
        .setColor(process.env.DEFAULT_COLOR)
        .setDescription(`

        > **Contact Information ->**

            -> **Discord Server** -> **[[Click Here!]](https://discord.gg/BSYzdQP)**
            -> **Steam Profile** -> **[[Click Here!]](https://steamcommunity.com/id/hirbosh/)**
        
        > **Other ->**

            -> **Github User** -> **[[Click Here!]](https://github.com/Lior-Koren)**
            -> **AlliedModders User** -> **[[Click Here!]](https://forums.alliedmods.net/member.php?u=304545)**
        
        **> Thank You For Using My Pugin! If You Feel Like You Want To Contribute, Use The GIthub Repo! Thanks ❤️!.**
        
        `)
        .setFooter(`Made With ❤️ By HirboSH`)
        .setTimestamp();

    message.channel.send(infoEmbed);


}
module.exports.help = {
    name:"info"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}