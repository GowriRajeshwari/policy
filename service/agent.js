const agent = require("../model/agent.js");
let agentModel = new agent();
module.exports = class agentService {
  addAgent(req) {
    return new Promise((resolve, reject) => {
      agentModel
        .create(req)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
