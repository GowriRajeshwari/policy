const agent = require("../service/agent.js");
userAccount = require("../service/userAccount.js");
user = require("../service/user");
policyCarrier = require("../service/policyCarrier");
policyCategory = require("../service/policyCategory");
policyInfo = require("../service/policyInfo");

let agentService = new agent();
let userAccountService = new userAccount();
let userService = new user();
let policyCarrierService = new policyCarrier();
let policyCategoryService = new policyCategory();
let policyInfoService = new policyInfo();

const Excel = require("exceljs");
var workbook = new Excel.Workbook();
module.exports = class policy {
  policyInfo(fileupload) {
    return new Promise((resolve, reject) => {
      workbook.csv.readFile(fileupload).then((worksheet) => {
        worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          Promise.all([Promise1(worksheet)])
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      });
    });
  }
};
const Promise1 = (worksheet) => {
  return new Promise((resolve, reject) => {
    agentService
      .addAgent({ agent_name: worksheet.getCell("A2").value })
      .then((agentServiceData) => {
        resolve(agentServiceData);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// userAccountService
//   .userAccount({ account_name: worksheet.getCell("N2").value })
//   .then((userAccountServiceData) => {
//     resolve(userAccountServiceData);
//   })
//   .catch((err) => {
//     reject(err);
//   });

// let userData = {
//   first_name: worksheet.getCell("Q2").value,
//   Dob: worksheet.getCell("X2").value,
//   email: worksheet.getCell("O2").value,
//   phone_number: worksheet.getCell("T2").value,
//   zip_code: worksheet.getCell("W2").value,
//   state: worksheet.getCell("V2").value,
//   address: worksheet.getCell("U2").value,
//   gender: worksheet.getCell("P2").value,
//   user_type: worksheet.getCell("B2").value,
// };
// userService
//   .user(userData)
//   .then((userServicData) => {
//     resolve(userServicData);
//   })
//   .catch((err) => {
//     reject(err);
//   });

// policyCarrierService
//   .policyCarrier({
//     company_name: worksheet.getCell("I2").value,
//   })
//   .then((policyCarrierServiceData) => {
//     resolve(policyCarrierServiceData);
//   })
//   .catch((err) => {
//     reject(err);
//   });

// policyCategoryService
//   .policyCategory({
//     category_name: worksheet.getCell("J2").value,
//   })
//   .then((policyCategoryServiceData) => {
//     resolve(policyCategoryServiceData);
//   })
//   .catch((err) => {
//     reject(err);
//   });

// let policyInfoData = {
//   policy_number: worksheet.getCell("E2").value,
//   policy_start_date: worksheet.getCell("K2").value,
//   policy_end_date: worksheet.getCell("L2").value,
//   policy_category: worksheet.getCell("H2").value,
//   agent_id: agentServiceData._id,
//   user_id: userServicData._id,
//   user_account_id: userAccountServiceData._id,
//   policy_category_id: policyCategoryServiceData._id,
//   policy_carrier_id: policyCarrierServiceData._id,
// };
// policyInfoService
//   .policyInfo(policyInfoData)
//   .then((data) => {
//     resolve(data);
//   })
//   .catch((err) => {
//     reject(err);
//   });
