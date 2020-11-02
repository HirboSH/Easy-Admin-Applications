const Discord = require("discord.js");
const mysql = require('mysql');
const { HostIP, UserName, UserPassword, DBName } = require("../config/config");

module.exports.run = async(client, message, args) => {

    var ApplicationIDFromUser;
    var ApplicationID;
    var ApplicationSubmitTime;

    var d = new Date();
    var AcceptedTime = d.toLocaleString();

    var PlayerNickName;
    var PlayerAuthID;
    var PlayerServer;
    var AnswerDiscord;

    if (args[0]){

        ApplicationIDFromUser = args[0];

    } else {

        let UsageErrorEmbed = new Discord.MessageEmbed()

            .setColor(process.env.DEFUALT_COLOR)
            .setDescription(`[❎] -> Usage -> **\`!accept <Application_ID>\`**.`)
            .setFooter(`Made With ❤️ By HirboSH`)
            .setTimestamp();

        return message.channel.send(UsageErrorEmbed);
    }

    var connection = mysql.createConnection({host: HostIP, user: UserName, password: UserPassword, database: DBName});

    SQL_Connection();

    SQL_QueryNum1();

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

    function SQL_QueryNum1(){
        connection.query('SELECT * FROM applications LIMIT 1', function (error, results, fields) {

            if (error) throw error;
    
            PlayerNickName = results[0].PlayerNickName;
            PlayerAuthID = results[0].PlayerAuthID;
            PlayerServer = results[0].PlayerServer;
            AnswerDiscord = results[0].AnswerDiscord;
            ApplicationSubmitTime = results[0].ApplicationSubmitTime;
            ApplicationID = results[0].ApplicationID;

            if (ApplicationIDFromUser == ApplicationID){

                let AcceptEmbed = new Discord.MessageEmbed()
        
                    .setTitle(`[🎉] -> Accepted! <- [🎉]`)
                    .setColor(process.env.DEFUALT_COLOR)
                    .setDescription(`
                    > **Accepted A New Admin!**
        
                        -> **ApplicationID** -> \`${ApplicationID}\`.
                        -> **Application Sent At** -> \`${ApplicationSubmitTime}\`.
        
                        -> **Accepted By** -> **${message.author}**.
                        -> **Accepted At** -> **${AcceptedTime}**.
                
                        -> **Player NickName** -> \`${PlayerNickName}\`.
                        -> **Player SteamID** -> \`${PlayerAuthID}\`.
                        -> **Player Discord** -> \`${AnswerDiscord}\`.
                        -> **Player Submited For [Sever Name]** -> \`${PlayerServer}\`.
        
                    > **🎉CHEERS!🎉**.
                    `)
                    .setFooter(`Made With ❤️ By HirboSH`)
                    .setTimestamp();
        
                message.channel.send(AcceptEmbed);

                let guild = client.guilds.cache.get(process.env.GUILD);
                let channel = guild.channels.cache.get(process.env.CHANNEL);
        
                let NewAdminEmbed = new Discord.MessageEmbed()
        
                    .setTitle(`[🎉] -> New Admin Accepted! <- [🎉]`)
                    .setColor(process.env.DEFUALT_COLOR)
                    .setDescription(`
                    -> **Player Name** -> \`${PlayerNickName}\`.
                    -> **Player Submited For [Server Name]** -> \`${PlayerServer}\`.
                    
                    -> Approved By -> **${message.author}**.
                    `)
                    .setFooter(`Made With ❤️ By HirboSH`)
                    .setTimestamp();
        
                channel.send(NewAdminEmbed);

            } else {
        
                let IDErrorEmbed = new Discord.MessageEmbed()
        
                    .setColor(process.env.DEFUALT_COLOR)
                    .setDescription(`[❎] -> The Application ID You Wrote **\`${ApplicationIDFromUser}\`**, **Is Not The ID Of The First Application To Review**.`)
                    .setTimestamp();
        
                return message.channel.send(IDErrorEmbed);
            }
        });
        SQL_DeleteApplication();
    }

    function SQL_DeleteApplication(){
        connection.query(`DELETE FROM applications WHERE ApplicationID = '${ApplicationIDFromUser}'`, function (error, results, fields) {
            if (error) throw error;
        });
    }

    function SQL_End(){
        connection.end(function(err) {
            if (err) throw err;
        });
    }
}
module.exports.help = {
    name:"accept"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    teamOnly: true
}