const sgMail = require('@sendgrid/mail')

const sendGridAPIKey = null

sgMail.setApiKey(sendGridAPIKey)

const sendWelcomeEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'codingonlyharshil@gmail.com',
        subject: 'Thanks for joining in !',
        text: `Welcome to the app ${name}`
    })

}

const sendDeleteEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'codingonlyharshil@gmail.com',
        subject: 'Sorry to see you go !',
        text: `Hope to see you back again ${name}`
    })

}

module.exports = { sendWelcomeEmail, sendDeleteEmail }
