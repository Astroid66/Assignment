module.exports = {
    name : 'echo',
    description : 'Echos a message in the channel',
    usage: 'echo <msg>', 
    execute(message,args){
        message.channel.send(args.join(" "));
    },
};
