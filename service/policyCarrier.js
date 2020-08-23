const policyCarrier = require("../model/policyCarrier.js");
let policyCarrierModel = new policyCarrier();
module.exports = class agentService {
  policyCarrier(req) {
    return new Promise((resolve, reject) => {
      policyCarrierModel
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
