const { MessageEmbed } = require('discord.js');
const config = require("../config.json")

module.exports = {
    name : 'help',
    description : 'Help regarding all the commands',
    usage: 'help',
    execute(message,args,client){
        commands = Array.from(client.commands);

        commandName = "";
        commandUsage = "";
        commandDescription = "";

        var exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help')

        // Iterate through all the commands
        for (var i = 0; i < commands.length; i++) {
            command = commands[i][1];

            commandName = command.name;
            
            if (command.usage == null) commandUsage = "-";
            else commandUsage = config.prefix + command.usage;
            commandUsage = "`" + commandUsage + "`";

            commandDescription = command.description;

            exampleEmbed.addField(commandName, commandDescription + "\n" + commandUsage);
 
        }

        message.channel.send(exampleEmbed);
    },
};
