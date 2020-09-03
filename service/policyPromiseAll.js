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
let policyService = require("../service/policyService");
let policyNew = new policyService();
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
              let data = await policyNew.policyAdd(operation);
              return data;
            },
          ],
          function (err, result) {
            console.log("done");
            userCallback(operation, userCallback);
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
