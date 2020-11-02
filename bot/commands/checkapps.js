const Discord = require("discord.js");
const mysql = require('mysql');
const { HostIP, UserName, UserPassword, DBName } = require("../config/config");

module.exports.run = async(client, message, args) => {

    var PlayerNickName;
    var PlayerAuthID;
    var PlayerServer;
    var ApplicationSubmitTime;
    var ApplicationID;
    var AnswerName;
    var AnswerAge;
    var AnswerDiscord;
    var AnswerDeserveTheJob;
    var AnswerOnDuty;
    var AnswerExperience;

    var connection = mysql.createConnection({host: HostIP, user: UserName, password: UserPassword, database: DBName});

    SQL_Connection();

    SQL_Query();

    SQL_End();

    function SQL_Connection(){
        connection.connect(function(err) {

            if (err) {
              console.error('[SQL] Error Connecting -> ' + err.stack);
              return;
            }
           
            console.log('[SQL] Connected, As ID -> ' + connection.threadId);
    
          });
    }

    function SQL_Query(){
        connection.query('SELECT * FROM applications LIMIT 1', function (error, results, fields) {

            if (error) throw error;

            if(results[0] != undefined){

                console.log(results);
    
                PlayerNickName = results[0].PlayerNickName;
                PlayerAuthID = results[0].PlayerAuthID;
                PlayerServer = results[0].PlayerServer;
                ApplicationSubmitTime = results[0].ApplicationSubmitTime;
                ApplicationID = results[0].ApplicationID;
                AnswerName = results[0].AnswerName;
                AnswerAge = results[0].AnswerAge;
                AnswerDiscord = results[0].AnswerDiscord;
                AnswerDeserveTheJob = results[0].AnswerDeserveTheJob;
                AnswerOnDuty = results[0].AnswerOnDuty;
                AnswerExperience = results[0].AnswerExperience;

                    let checkappsEmbed = new Discord.MessageEmbed()

                        .setTitle(`[⏱️] -> Available Applications Waiting For Review <- [⏱️]`)
                        .setColor(process.env.DEFAULT_COLOR)
                        .setDescription(`
                        > **Player-NickName** -> \`${PlayerNickName}\`.

                        > **Player-STEAMID** -> \`${PlayerAuthID}\`.

                        > **Player Submited For [Sever Name]** -> \`${PlayerServer}\`.

                        > **Submitted At** -> \`${ApplicationSubmitTime}\`.

                        > **What Is Your Name?** -> \`${AnswerName}\`.

                        > **How Old Are You?** -> \`${AnswerAge}\`.

                        > **What Is Your Discord?** -> \`${AnswerDiscord}\`.

                        > **Why Do You Deserve The Job?**

                            -> \`${AnswerDeserveTheJob}\`.

                        > **How Long A Day Can You Be On Duty?**

                            -> \`${AnswerOnDuty}\`.

                        > **Do You Have Experience In Such A Position?**

                            -> \`${AnswerExperience}\`.

                        > **ApplicationID** -> \`${ApplicationID}\`.

                        **To Accept This Application Type -> \`!accept ${ApplicationID}\`.**
                        **To Decline This Application Type -> \`!decline ${ApplicationID}\`.**`)
                        .setThumbnail(client.user.displayAvatarURL())
                        .setFooter(`Made With ❤️ By HirboSH`)
                        .setTimestamp();

                        message.channel.send(checkappsEmbed);
            } else {
                let NoResultsEmbed = new Discord.MessageEmbed()

                .setColor(process.env.DEFUALT_COLOR)
                .setDescription(`[❎] -> There's **No Pending Applications** For Review.`)
                .setFooter(`Made With ❤️ By HirboSH`)
                .setTimestamp();
    
                return message.channel.send(NoResultsEmbed);
            }
        });
    }

    function SQL_End(){
        connection.end(function(err) {
            if(err) throw err;
        });
    }

}
module.exports.help = {
    name:"checkapps"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    teamOnly: true
}