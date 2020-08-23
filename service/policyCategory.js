const policyCategory = require("../model/policyCategory.js");
let policyCategoryModel = new policyCategory();
module.exports = class agentService {
  policyCategory(req) {
    return new Promise((resolve, reject) => {
      policyCategoryModel
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
