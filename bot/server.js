const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ["TYPING_START"]
});
require('dotenv').config();

client.prefix = process.env.PREFIX;
client.commands = new Discord.Collection();

const commands = require("./structures/command");
commands.run(client);

const events = require("./structures/event");
events.run(client);

client.login(process.env.TOKEN);