const userModel = require("../../models/user.model");

class Status {
  static getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find({ userRole: "user" });
      res.send(users);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };

  static changeUserStatus = async (req, res) => {
    try {
      if (!req.body.status) {
        throw new Error("Please provide status");
      }

      const user = await userModel.findById(req.params.id);

      if (user.userRole === "admin") {
        throw new Error("Admin always active");
      }
      if (user.status === req.body.status) {
        throw new Error("Please provide another status");
      }
      if (user.status === "suspended") {
        throw new Error("You cannot change suspended user status");
      }
      if (user.status === "active" && req.body.status === "suspended") {
        throw new Error("You have to deactive the user first");
      }

      user.status = req.body.status;
      await user.save();

      res.send(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  };
}

module.exports = Status;
