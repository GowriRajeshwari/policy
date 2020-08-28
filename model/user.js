const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      unique: true,
    },
    Dob: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone_number: {
      type: String,
      unique: true,
    },
    zip_code: {
      type: String,
      unique: true,
    },
    state: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
      unique: true,
    },
    user_type: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

var userModel = mongoose.model("user", userSchema);
exports.userModel;

module.exports = class model {
  create(req) {
    let userDetails = new userModel(req);
    return userDetails.save();
  }
  find(req) {
    return userModel.findOne(req);
  }
};
