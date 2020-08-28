const policyInfo = require("../model/policyInfo.js");
let policyInfoModel = new policyInfo();
module.exports = class agentService {
  async policyInfo(req) {
    policyInfoModel
      .create(req)
      .then((data) => {
        console.log("new data", data);

        return data;
      })
      .catch((err) => {
        return err;
      });
  }
};
