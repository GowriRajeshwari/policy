const policyCategory = require("../model/policyCategory.js");
let policyCategoryModel = new policyCategory();
module.exports = class agentService {
  policyCategory(req) {
    return new Promise((resolve, reject) => {
      policyCategoryModel
        .find(req)
        .then((data) => {
          if (data) {
            resolve(data);
          } else {
            policyCategoryModel
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

    // let finddata = await policyCategoryModel.find(req);
    // if (finddata) {
    //   return finddata;
    // } else {
    //   await policyCategoryModel
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
