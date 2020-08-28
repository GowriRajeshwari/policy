const user = require("../model/user.js");
let userModel = new user();
module.exports = class agentService {
  async user(req) {
    let finddata = await userModel.find(req);
    if (finddata) {
      return finddata;
    } else {
      userModel
        .create(req)
        .then((data) => {
          console.log("new data", data);

          return data;
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
