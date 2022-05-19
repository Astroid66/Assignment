const fs = require("fs");
const config = require("../config.json")

module.exports = {
    name : 'add_ctf_score',
    description : 'Adds individual scores for a particular CTF or update scores for existing CTF',
    usage: `add_ctf_score <CTF>
<chall1> : <user1> , <user2=10>
<chall2> : <user3>`,
    
    execute(message,args){

        // Only mods can add CTF scores
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

                // CTF name and challenges must be separated by newline 
                argList = args.join(" ").split("\n");
                ctfName = argList.shift();
                ctfName = ctfName.trim();

                // ctfObject represents all the information regarding the CTF being added
                let ctfObject = {};

                // If ctf already exists, update it (add new challenges and overwrite existing ones)
                if (ctfName in ctf_scores) {
                    ctfObject = ctf_scores[ctfName];
                }

                // Iterating through all the challenges passed in as arguments
                for (var i = 0; i < argList.length; i++) { 
                    challenge = argList[i];
                    challenge = challenge.split(":");
                    challengeName = challenge.shift();
                    challengeName = challengeName.trim();

                    // If challenge already exists, delete those values from scoreboard as scoreboard will be updated by new values
                    if (challengeName in ctfObject) {
                        oldScoresArray = ctfObject[challengeName];
                        for (var j = 0; j < oldScoresArray.length; j++) {
                            score = oldScoresArray[j];
                            for (user in score) {
                                scoreboard[user] = scoreboard[user] - score[user];
                            }
                        }
                    }

                    scores = challenge[0].trim().split(",");
                    let scoresArray = [];

                    // Iterating through different user scores for a challenge
                    for (var j = 0; j < scores.length; j++) {
                        scores[j] = scores[j].trim();
                        let key, value;
                        
                        if (scores[j].includes("=")) {
                            score = scores[j].split("=");
                            key = score[0].trim();
                            value = parseFloat(score[1].trim());
                        }
                        else {
                            key = scores[j];
                            value = 1;
                        }
                        
                        let scoreObject = {};
                        scoreObject[key] = value;
                        scoresArray.push(scoreObject);

                        // Update Scoreboard
                        if (key in scoreboard) {
                            scoreboard[key] = scoreboard[key] + value;
                        }
                        else {
                            scoreboard[key] = value;
                        }
                    }

                    ctfObject[challengeName] = scoresArray;
                }

                // Adding (Updating) the ctfObject to ctf_scores file 
                ctf_scores[ctfName] = ctfObject;

                ctf_scores = JSON.stringify(ctf_scores);
                fs.writeFile("./db/ctf_scores.json", ctf_scores, function(err, result) {
                    if (err) throw err;
                });

                // Updating the scoreboard file
                scoreboardArray = Object.entries(scoreboard).sort((a,b) => b[1]-a[1]);

                scoreboard = {};
                for (var i = 0; i < scoreboardArray.length; i++) {
                    scoreboard[scoreboardArray[i][0]] = scoreboardArray[i][1];
                }

                scoreboard = JSON.stringify(scoreboard);
                fs.writeFile("./db/scoreboard.json", scoreboard, function(err, result) {
                    if (err) throw err;
                    message.channel.send("CTF Score successfully added");
                });
            });
        });    
    },
};
