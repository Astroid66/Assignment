const fs = require("fs");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'scoreboard',
    description : 'Display the scoreboard. Can specify how many participants to show and from which position using optional arguments cnt and offset',
    usage: 'scoreboard [cnt] [offset]',
    
    execute(message,args){
        fs.readFile("./db/scoreboard.json", function(err, scoreboard) {
            if (err) throw err;
            scoreboard = JSON.parse(scoreboard);

            userIdArray = Object.keys(scoreboard);

            let cnt, offset;
            
            if (args.length >= 1) cnt = parseInt(args[0]);
            else cnt = Math.min(userIdArray.length, 10);

            if (args.length == 2) offset = parseInt(args[1]);
            else offset = 0;

            users = "";
            scores = "";

            for (userId in scoreboard) {
                users += userId+ "\n";
                scores += scoreboard[userId] + "\n";
            }

            if (users != "" && scores != "") {
                const exampleEmbed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle('Scoreboard')
                    .addField('Users', users, true)
                    .addField('\u200b', '\u200b', true)
                    .addField('Scores', scores, true)

                message.channel.send(exampleEmbed);
            }
        });  
    },
};
