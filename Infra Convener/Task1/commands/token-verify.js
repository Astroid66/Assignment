const active_tokens = require('../db/active_tokens.json')
const config = require('../config.json')
const fs = require('fs')

module.exports = {
    name : 'token-verify',
    description : 'Verifies the token that was sent to your mail.',
    usage: null,
    execute(message,args){

        if(!(message.channel.type=="dm")){
            message.reply("Verification can only be done on dm.");
            return;
        }

        let server = message.client.guilds.cache.get(config.server_id);

        if(!server.member(message.author.id)){
            message.reply(`You are not a member of the ${server.name} server. Please join the server first.`);
            return;
        }

        if(!(message.author.id in active_tokens)){
            message.reply('You need to provide your iitb mail id with `%verify YOUR_LDAP_ID` first.')
            return;
        }

        if(args.length !=1){
            message.reply('The format for the command is `%verify YOUR_TOKEN`.');
            return;
        }

        let token = args[0];

        if(active_tokens[message.author.id]!=token){
            message.reply("Incorrect token!");
            return;
        }

        let sender = server.members.cache.get(message.author.id);

        sender.roles.add(config.verified_id)
        
        delete active_tokens[message.author.id];
        fs.writeFileSync('db/active_tokens.json',JSON.stringify(active_tokens))
        
        const channel = message.client.channels.cache.find(channel => channel.name === "intros")
        channel.send(`Hey <@${message.author.id}>\nStart here with an intro!`)

        message.reply("You are now verified.") //tag 
    },
};