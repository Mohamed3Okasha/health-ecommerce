const userModel = require("../../models/user.model");
const { sendWelcomeEmail } = require("../../emails/account");

class User {
  static register = async (req, res) => {
    const user = new userModel(req.body);

    try {
      await user.save();
      sendWelcomeEmail(user.email, user.name);
      const token = await user.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static login = async (req, res) => {
    try {
      const user = await userModel.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user, token });
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static logoutAll = async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send();
    } catch (e) {
      res.status(500).send();
    }
  };

  static me = async (req, res) => {
    res.send(req.user);
  };
}

module.exports = User;
