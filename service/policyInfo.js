const policyInfo = require("../model/policyInfo.js");
let policyInfoModel = new policyInfo();
module.exports = class agentService {
  policyInfo(req) {
    return new Promise((resolve, reject) => {
      policyInfoModel
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
