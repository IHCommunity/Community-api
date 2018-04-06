const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_CLIENT_MAIL,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_CLIENT_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_CLIENT_TOKEN
  },
});

var message = {
    from: 'Juan Cuesta 😠 <sender@server.com>',
    to: process.env.GMAIL_MARCO_MAIL,
    subject: 'Test',
    text: 'Bla bla bla bla bla bla bla!',
    html: '<p>HTML version of the message</p>'
};

transporter.sendMail(message, function(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log('Email sent');
    }
});
