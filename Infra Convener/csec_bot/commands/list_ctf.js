const fs = require("fs");
const { MessageEmbed } = require('discord.js');

module.exports = {
    name : 'list_ctf',
    description : "Gives the list of CTFs. If the optional argument 'full' is provided then displays scores of individual challenges and users.",
    usage: 'list_ctf [full]', 
    
    execute(message,args){
        
        let is_full = false;
        if (args.length == 1 && args[0] == 'full') {
            is_full = true;
        }
        
        fs.readFile("./db/ctf_scores.json", function(err, ctf_scores) {
            if (err) throw err;
            ctf_scores = JSON.parse(ctf_scores);

            var exampleEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('CTF List')

            if (is_full) {
                for (ctf in ctf_scores) {
                    scores = "";
                    for (chall in ctf_scores[ctf]) {
                        scores += chall + " : ";
                        for (var i = 0; i < ctf_scores[ctf][chall].length; i++) {
                            userScore = ctf_scores[ctf][chall][i];
                            for (user in userScore) {
                                if (i == 0) scores += user + " = " + userScore[user];
                                else scores += " , " + user + " = " + userScore[user];
                            }
                        }
                        scores += "\n";
                    }
                    if (scores != "") exampleEmbed.addField(ctf, scores);
                }
            }
            else {
                ctf_names = "";
                for (ctf in ctf_scores) {
                    ctf_names += ctf + "\n";
                }
                if (ctf_names != "") exampleEmbed.addField("CTFs", ctf_names);
            }

            message.channel.send(exampleEmbed);
        });    
    },
};
