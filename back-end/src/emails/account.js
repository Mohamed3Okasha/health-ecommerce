const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Email = {
  sendWelcomeEmail(email, name) {
    sgMail.send({
      to: email,
      from: "alkhateb118@gmail.com",
      subject: "Thanks for joining in!",
      text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
    });
  },

  sendCancelEmail(email, name) {
    sgMail.send({
      to: email,
      from: "alkhateb118@gmail.com",
      subject: "Sorry te see you go!",
      text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
    });
  },
};

module.exports = Email;
