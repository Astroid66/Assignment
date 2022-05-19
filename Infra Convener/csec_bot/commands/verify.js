const config = require('../config.json')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const active_tokens = require('../db/active_tokens.json');
const fs = require('fs');
const { google } = require('googleapis')

const CLIENT_ID = 'REDACTED'
const CLIENT_SECRET = 'REDACTED'
const REDIRECT_URL = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = 'REDACTED'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN});

async function getAccessToken(){
  return (await oAuth2Client.getAccessToken())
}

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'verifcation.bot.cseciitb@gmail.com',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: getAccessToken() 
  }
});

function getToken() {
  return crypto.randomBytes(16).toString('base64');
}

module.exports = {
  name: 'verify',
  description: 'Verifies you by your ldap mail.',
  usage: null,
  async execute(message, args) {

    if (!(message.channel.type == "dm")) {
      message.reply("Verification can only be done on dm.");
      return;
    }

    let server = message.client.guilds.cache.get(config.server_id);

    if (!server.member(message.author.id)) {
      message.reply(`You are not a member of the ${server.name} server. Please join the server first.`)
      return;
    }

    let sender = server.members.cache.get(message.author.id);

    if (sender.roles.cache.has(config.verified_id)) {
      message.reply('You are already verified on the server.')
      return
    }

    if (args.length != 1) {
      message.reply('The format for the command is `%verify YOUR_LDAP_ID`.');
      return;
    }

    let ldap_id = args[0];

    if (!(ldap_id.endsWith("@iitb.ac.in"))) {
      message.reply('The id you provided was not a valid ldap id.');
      return;
    }

    let token = await getToken();

    let mailDetails = {
      from: 'verifcation.bot.cseciitb@gmail.com',
      to: ldap_id,
      subject: 'Verification for the IITB ctf discord server',
      html: `Your verification token is\n<h2>${token}<\h2>`
    }

    await mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.error(err);
        message.reply("Some error occured during sending the mail, please try again. If the issue persists, please ping `WeaveAche#0459` on the server.")
        return
      } else {
        console.log(`Email sent to ${ldap_id} by user ${message.author.username}.`)
        message.reply(`Verification token was sent to ${ldap_id} successfully. Reply with \`%token-verify YOUR_TOKEN\` to get verified.\nIf you think you made a typo while sending your id, you can always do \`%verify your_ldap_id\` again.`);

      }
    })

    active_tokens[message.author.id] = token;
    fs.writeFileSync('./db/active_tokens.json', JSON.stringify(active_tokens))


  },
};
