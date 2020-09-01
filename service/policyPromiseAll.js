const agentM = require("../model/agent.js");
let agentModel = new agentM();
const userAccount = require("../model/userAccount.js");
let userAccountModel = new userAccount();
const user = require("../model/user.js");
let userModel = new user();
const policyCarrier = require("../model/policyCarrier.js");
let policyCarrierModel = new policyCarrier();
const policyCategory = require("../model/policyCategory.js");
let policyCategoryModel = new policyCategory();
const policyInfo = require("../model/policyInfo.js");
let policyInfoModel = new policyInfo();

var async = require("async");

const Excel = require("exceljs");
var workbook = new Excel.Workbook();
module.exports = class policy {
  async policyInfo(fileupload) {
    var operation = [];
    await workbook.csv.readFile(fileupload).then((worksheet) => {
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        let currRow = worksheet.getRow(rowNumber);
        let data = {
          agent_name: currRow.getCell(1).value,
          account_name: currRow.getCell(14).value,
          first_name: currRow.getCell(17).value,
          Dob: currRow.getCell(24).value,
          email: currRow.getCell(15).value,
          phone_number: currRow.getCell(20).value,
          zip_code: currRow.getCell(23).value,
          state: currRow.getCell(22).value,
          address: currRow.getCell(21).value,
          gender: currRow.getCell(16).value,
          user_type: currRow.getCell(2).value,
          company_name: currRow.getCell(9).value,
          category_name: currRow.getCell(10).value,
          policy_number: currRow.getCell(5).value,
          policy_start_date: currRow.getCell(11).value,
          policy_end_date: currRow.getCell(12).value,
          policy_category: currRow.getCell(8).value,
        };
        // let dtt = JSON.parse(data);
        operation.push(data);
      });
    });
    async.forEachLimit(
      operation,
      1,
      function (operation, userCallback) {
        async.waterfall(
          [
            async function (callback) {
              var ans;
              let agentData = await agentModel.find({
                agent_name: operation.agent_name,
              });
              if (agentData) {
                // return callback(null, agentData);
                ans = agentData;
              } else {
                let data = await agentModel.create({
                  agent_name: operation.agent_name,
                });
                ans = data;
              }
              return ans;
            },
            async function (arg1, callback) {
              var ans;
              let finddata = await userAccountModel.find({
                account_name: operation.account_name,
              });
              if (finddata) {
                ans = finddata;
              } else {
                let data = await userAccountModel.create({
                  account_name: operation.account_name,
                });
                ans = data;
              }
              // callback(null, arg1, ans);
              return [arg1, ans];
            },
            async function (arg2, callback) {
              let userData = {
                first_name: operation.first_name,
                Dob: operation.Dob,
                email: operation.email,
                phone_number: operation.phone_number,
                zip_code: operation.zip_code,
                state: operation.state,
                address: operation.address,
                gender: operation.gender,
                user_type: operation.user_type,
              };
              var ans;
              let data = await userModel.create(userData);
              ans = data;
              return [arg2[0], arg2[1], ans];
            },
            async function (arg3, callback) {
              var ans;
              let finddata = await policyCarrierModel.find({
                company_name: operation.company_name,
              });
              if (finddata) {
                ans = finddata;
              } else {
                let data = await policyCarrierModel.create({
                  company_name: operation.company_name,
                });
                and = data;
              }
              // console.log("data", arg3[2]);
              return [arg3[0], arg3[1], arg3[2], ans];
            },
            async function (arg4, callback) {
              var ans;
              let finddata = await policyCategoryModel.find({
                category_name: operation.category_name,
              });
              if (finddata) {
                ans = finddata;
              } else {
                let data = await policyCategoryModel.create({
                  category_name: operation.category_name,
                });
                and = data;
              }
              // console.log("data", arg3[2]);
              return [arg4[0], arg4[1], arg4[2], arg4[3], ans];
            },
            async function (arg5, callback) {
              let policyInfoData = {
                policy_number: operation.policy_number,
                policy_start_date: operation.policy_start_date,
                policy_end_date: operation.policy_end_date,
                policy_category: operation.policy_category,
                agent_id: arg5[0]._id,
                user_id: arg5[2]._id,
                user_account_id: arg5[1]._id,
                policy_category_id: arg5[4]._id,
                policy_carrier_id: arg5[3]._id,
              };
              var ans;
              let data = await policyInfoModel.create(policyInfoData);
              and = data;
              return [ans];
            },
          ],
          function (err, result) {
            console.log("done");
            userCallback();
          }
        );
      },
      function (err) {
        console.log("User For Loop Completed");
        return true;
      }
    );
  }
};
