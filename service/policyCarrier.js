const policyCarrier = require("../model/policyCarrier.js");
let policyCarrierModel = new policyCarrier();
module.exports = class agentService {
  policyCarrier(req) {
    return new Promise((resolve, reject) => {
      policyCarrierModel
        .find(req)
        .then((data) => {
          if (data) {
            resolve(data);
          } else {
            policyCarrierModel
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
    // let finddata = await policyCarrierModel.find(req);
    // if (finddata) {
    //   return finddata;
    // } else {
    //   await policyCarrierModel
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
