
const config = require("../config.json")

module.exports = {
    name : 'message',
    execute(message,client){
    if (!message.content.startsWith(config.prefix)|| message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);

    let command;
    command = args.shift().toLowerCase();

    if(!client.commands.has(command)) command = "help";
    

    try{
        if (command == "help") {
            client.commands.get(command).execute(message,args,client); 
        }
        else {
            client.commands.get(command).execute(message,args);
        }
    } catch (error){
        console.error(error);
        message.reply("an error occurred during the execution of the command");
    }

    },
};