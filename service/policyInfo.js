// const policyInfo = require("../model/policyInfo.js");
// let policyInfoModel = new policyInfo();
// module.exports = class agentService {
//   async policyInfo(req) {
//     // return Promise((reslove, reject) => {
//     //   policyInfoModel
//     //     .create(req)
//     //     .then((data) => {
//     //       console.log("new data", data);
//     //       reslove(data);
//     //     })
//     //     .catch((err) => {
//     //       reject(err);
//     //     });
//     // });
//     // console.log("dataINservice", req);
//     await policyInfoModel
//       .create(req)
//       .then((data) => {
//         console.log("new data", data);
//         return data;
//       })
//       .catch((err) => {
//         return err;
//       });
//   }
// };

const policyInfo = require("../model/policyInfo.js");
let policyInfoModel = new policyInfo();
module.exports = class agentService {
  async policyInfo(req) {
    // let finddata = await policyInfoModel.find(req);
    // if (finddata) {
    //   return finddata;
    // } else {
    await policyInfoModel
      .create(req)
      .then((data) => {
        // console.log("new data", data);
        return data;
      })
      .catch((err) => {
        return err;
      });
    // }
  }
};
