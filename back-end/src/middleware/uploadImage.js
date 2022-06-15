const multer = require("multer");
const path = require("path");
const fs = require("fs");
const isImage = require("is-image");

let loc = "";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    loc = path.join("src/public", file.fieldname);

    fs.mkdir(loc, (err) => {});
    cb(null, loc);
  },
  filename: function (req, file, cb) {
    const myName = `${Date.now()}${path.extname(file.originalname)}`;
    req.image = myName;
    cb(null, myName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 20000000 },
  fileFilter: function (req, file, cb) {
    if (!isImage(file.originalname)) {
      return cb(new Error("ONLY IMAGES"), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
