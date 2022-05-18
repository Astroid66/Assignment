const request = require("request-promise");
const Discord = require("discord.js")

async function getUpcoming(){
    const result = await request.get("https://ctftime.org/api/v1/events/")
    return JSON.parse(result)
}

module.exports = {
    name : 'upcoming',
    description : 'Retrieves upcoming ctfs from ctftime',
    usage : 'upcoming <NUMBER_OF_UPCOMING_CTFS>',
    execute(message,args){

        if((message.channel.type=="dm")){
            return;
        }
        
        if(args.length !=1){
            message.reply('The format for the command is `%upcoming NUMBER_OF_UPCOMING_CTFS`.');
            return;
        }

        let number_of_embeds = parseInt(args[0])

        if(isNaN(number_of_embeds)){
            message.reply('The format for the command is `%upcoming NUMBER_OF_UPCOMING_CTFS`.');
            return;
        }

        getUpcoming().then((s)=>{
          
          if(number_of_embeds>5){
            number_of_embeds = 5;
            // dont want to spam channel with embeds :flushed:
          }

          for(let i=0;i<number_of_embeds;i++){

              let discord_invite = s[i].description.match(/https:\/\/discord.gg\/\S*/g) || s[i].description.match(/https:\/\/discord.com\/invite\/\S*/g) || 'Not provided';
              let start = new Date(s[i].start).toLocaleString('en-US',{timeZone:'Asia/Kolkata'});
              let finish = new Date(s[i].finish).toLocaleString('en-US',{timeZone:'Asia/Kolkata'});

              const Embed = new Discord.MessageEmbed()
                  .setColor('#0099ff')
                  .setTitle(s[i].title)
                  .setURL(s[i].url)
                  .setAuthor('IITBreachers', 'https://cdn.discordapp.com/avatars/874611510993883136/bcfdd636247e28ceda344de0fb57bf29.png','')
                  .setThumbnail(s[i].logo)
                  .addFields(
                      { name: 'Discord-invite', value: discord_invite},
                      { name: 'Start', value: start, inline: true },
                      { name: 'Finish', value: finish, inline: true },
                  )
                  .addFields(
                      { name: 'Duration', value: `${s[i].duration.days} days and ${s[i].duration.hours} hours` , inline: true },
                      { name: 'Format', value: s[i].format , inline: true },
                      { name: 'Teams', value: s[i].participants, inline: true },
                  )
                  .setFooter('Taken from ctftime.org');
              
              message.channel.send(Embed);
          }
            
        })

    },
};