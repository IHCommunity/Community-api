const nodemailer = require('nodemailer');

class Mailer {

    constructor(message)
    {
        this.service = 'gmail';
        this.auth = {
            type: 'OAuth2',
            user: process.env.GMAIL_CLIENT_MAIL,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_CLIENT_REFRESH_TOKEN,
            accessToken: process.env.GMAIL_CLIENT_TOKEN
        }
        this.message = message;
    }

    sendNewMail() {
        const transporter = nodemailer.createTransport({
          service: this.service,
          auth: this.auth
        });
        transporter.sendMail(this.message, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log('Email sent');
            }
        });
    }
}

module.exports = Mailer;
