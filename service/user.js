const user = require("../model/user.js");
let userModel = new user();
module.exports = class agentService {
  user(req) {
    return new Promise((resolve, reject) => {
      userModel
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
