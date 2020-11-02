const Discord = require("discord.js");
const mysql = require('mysql');
const { HostIP, UserName, UserPassword, DBName } = require("../config/config");

module.exports.run = async(client, message, args) => {

    var ApplicationIDFromUser;
    var ApplicationID;
    var ApplicationSubmitTime;

    var d = new Date();
    var DeclinedTime = d.toLocaleString();

    var PlayerNickName;
    var PlayerAuthID;
    var PlayerServer;
    var AnswerDiscord;

    if (args[0]){

        ApplicationIDFromUser = args[0];

    } else {

        let UsageErrorEmbed = new Discord.MessageEmbed()

            .setColor(process.env.DEFUALT_COLOR)
            .setDescription(`[❎] -> Usage -> **\`!decline <Application_ID>\`**.`)
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

                let DeclinedEmbed = new Discord.MessageEmbed()
        
                    .setTitle(`[😢] -> Declined! <- [😢]`)
                    .setColor(process.env.DEFUALT_COLOR)
                    .setDescription(`
                    > **Application Declined...😢**
        
                    -> **ApplicationID** -> \`${ApplicationID}\`.
                    -> **Application Sent At** -> \`${ApplicationSubmitTime}\`.
        
                    -> **Declined By** -> **${message.author}**.
                    -> **Declined At** -> **${DeclinedTime}**.
                
                    -> **Player NickName** -> \`${PlayerNickName}\`.
                    -> **Player SteamID** -> \`${PlayerAuthID}\`.
                    -> **Player Discord** -> \`${AnswerDiscord}\`.
                    -> **Player Submited For [Sever Name]** -> \`${PlayerServer}\`.
        
                    > **😢GG:(😢**.
                    `)
                    .setFooter(`Made With ❤️ By HirboSH`)
                    .setTimestamp();
        
                message.channel.send(DeclinedEmbed);

            } else {
        
                let IDErrorEmbed = new Discord.MessageEmbed()
        
                    .setColor(process.env.DEFUALT_COLOR)
                    .setDescription(`[❎] -> The Application ID You Wrote **\`${ApplicationIDFromUser}\`**, **Is Not The ID Of The First Application To Review**.`)
                    .setFooter(`Made With ❤️ By HirboSH`)
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
            if(err) throw err;
        });
    }
}
module.exports.help = {
    name:"decline"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: [],
    teamOnly: true
}