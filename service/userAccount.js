const userAccount = require("../model/userAccount.js");
let userAccountModel = new userAccount();
module.exports = class agentService {
  userAccount(req) {
    return new Promise((resolve, reject) => {
      userAccountModel
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
