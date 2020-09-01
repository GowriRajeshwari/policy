const mongoose = require("mongoose");

const policySchema = mongoose.Schema(
  {
    policy_number: {
      type: String,
    },
    policy_start_date: {
      type: String,
    },
    policy_end_date: {
      type: String,
    },
    policy_category: {
      type: String,
    },
    agent_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "agent",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
    },
    user_account_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "userAccount",
    },
    policy_category_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "policyCategory",
    },
    policy_carrier_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "policyCarrier",
    },
  },
  {
    timestamps: true,
  }
);

var policyModel = mongoose.model("policyinfo", policySchema);
exports.policyModel;

module.exports = class model {
  create(req) {
    let polcyinfo = new policyModel(req);
    return polcyinfo.save();
  }
  find(req) {
    console.log(req);
    let o_id = mongoose.type.ObjectId(req);
    console.log("o_id", o_id);
    return policyModel.find({ user_id: o_id });
  }
};
