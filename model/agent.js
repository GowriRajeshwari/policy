const mongoose = require("mongoose");

const agentSchema = mongoose.Schema(
  {
    agent_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var agentModel = mongoose.model("agent", agentSchema);
exports.agentModel;

module.exports = class model {
  create(req) {
    let agentName = new agentModel(req);
    return agentName.save();
  }
  find(req) {
    return agentModel.find(req.find);
  }
};
