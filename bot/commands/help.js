const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    let helpEmbed = new Discord.MessageEmbed()

        .setTitle(`[⚙️] -> Help Center <- [⚙️]`)
        .setColor(process.env.DEFAULT_COLOR)
        .setDescription(`
        > **__Commands__**

            !**help** -> This Menu.
            
            !**checkaccess** -> Check If You Are Able To See The Applications.
            !**checkapps** -> Check The Recived Applications Waiting For Review.
            !**accept <id>** -> Accept The Application!:).
            !**decline <id>** -> Decline The Application..:(.

            !**info** -> Some Info About Me.

        > **__Useful Links__**

            **Support Server** -> [Click Here!](https://discord.gg/)
            **Official Website** -> [Click Here!](https://hirbosh.cc/)
            **Plugin Thread [AlliedModders]** -> [Click Here!](https://alliedmodders.net/)
            **Github Repo** -> [Click Here!](https://github.com/)

        > **__Note__**

            **If The Bot Is Not Working, Check If The Bot Has The Following Permissions: \`SEND_MESSAGES\`, \`EMBED_LINKS\`.**
            **If You Encounter Another Problem, You Are More Than Welcome To Report This At My Support Server.**

        > **__Credits__**

            **HirboSH** [\`HirboSH#2005\`] -> Bot & Plugin Developer.`)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(`Made With ❤️ By HirboSH`)
        .setTimestamp();

    message.channel.send(helpEmbed);

}
module.exports.help = {
    name:"help"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    ownerOnly: false
}