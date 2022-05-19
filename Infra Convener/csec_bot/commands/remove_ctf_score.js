const fs = require("fs");
const config = require("../config.json")

module.exports = {
    name : 'remove_ctf_score',
    description : 'Remove all scores for a particular CTF',
    usage: 'remove_ctf_score <CTF>',
    
    execute(message,args){

        // Only mods can remove CTF scores
        if (! message.member.roles.cache.some(role => role.name === config.mod_name)) {
            message.channel.send("Only mods can run this");
            return;
        } 

        // Reading scoreboard to update scoreboard simultaneously
        fs.readFile("./db/scoreboard.json", function(err, scoreboard) {
            if (err) throw err;
            scoreboard = JSON.parse(scoreboard);

            fs.readFile("./db/ctf_scores.json", function(err, ctf_scores) {
                if (err) throw err;
                ctf_scores = JSON.parse(ctf_scores);

                ctfName = args;
                let deleted = false;

                for (ctf in ctf_scores) {
                    if (ctfName == ctf) {

                        for (chall in ctf_scores[ctf]) {
                            for (var i = 0; i < ctf_scores[ctf][chall].length; i++) {
                                score = ctf_scores[ctf][chall][i];
                                for (user in score) {
                                    scoreboard[user] = scoreboard[user] - score[user];
                                }
                            }
                        } 

                        delete ctf_scores[ctf];
                        deleted = true;
                        break;
                    }
                }

                if (!deleted) {
                    message.channel.send("No CTF exists with matching name");
                    return;
                }

                ctf_scores = JSON.stringify(ctf_scores);
                fs.writeFile("./db/ctf_scores.json", ctf_scores, function(err, result) {
                    if (err) throw err;
                });

                scoreboardArray = Object.entries(scoreboard).sort((a,b) => b[1]-a[1]);
                
                scoreboard = {}
                for (var i = 0; i < scoreboardArray.length; i++) {
                    scoreboard[scoreboardArray[i][0]] = scoreboardArray[i][1]
                }

                scoreboard = JSON.stringify(scoreboard);
                fs.writeFile("./db/scoreboard.json", scoreboard, function(err, result) {
                    if (err) throw err;
                    message.channel.send("CTF Score successfully removed");
                });
            });
        });
    },
};
