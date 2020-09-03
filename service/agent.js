const agent = require("../model/agent.js");
let agentModel = new agent();
module.exports = class agentService {
  addAgent(req) {
    return new Promise((resolve, reject) => {
      agentModel
        .find(req)
        .then((data) => {
          if (data) {
            resolve(data);
          } else {
            agentModel
              .create(req)
              .then((data) => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
    // let finddata = await agentModel.find(req);
    // if (finddata) {
    //   return finddata;
    // } else {
    //   await agentModel
    //     .create(req)
    //     .then((data) => {
    //       return data;
    //     })
    //     .catch((err) => {
    //       return err;
    //     });
    // }
  }
};
