const multer = require("multer");

var upload = multer({
  dest: "tmp/csv/",
  fileFilter: function (req, file, cb) {
    console.log("file is", file);
    cb(null, true);
  },
});

module.exports = upload;
