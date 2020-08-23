const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    Dob: {
      type: Number,
    },
    email: {
      type: String,
    },
    phone_number: {
      type: Number,
    },
    zip_code: {
      type: Number,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    user_type: {
      type: String,
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
