var async = require("async");
const policyinfo = require("../model/policyInfo");
let policyinfoModel = new policyinfo();
// let policyNew = new policyAdd();
const user = require("../model/user");
let userModel = new user();

const Excel = require("exceljs");
var workbook = new Excel.Workbook();
module.exports = class policy {
  policyInfo(fileupload) {
    let responseResult = {};
    var ExcelDataArray = [];
    workbook.csv.readFile(fileupload).then(() => {
      var worksheet = workbook.getWorksheet(1);
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        if (rowNumber > 1) {
          var newExcelDataDump = {};
          for (var i = 1; i < row.values.length; i++) {
            if (worksheet.getRow(1).values[i] == "agent") {
              newExcelDataDump.agent_name = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "policy_number") {
              newExcelDataDump.policy_number = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "company_name") {
              newExcelDataDump.company_name = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "category_name") {
              newExcelDataDump.category_name = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "userType") {
              newExcelDataDump.user_type = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "policy_type") {
              newExcelDataDump.policy_category = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "policy_start_date") {
              newExcelDataDump.policy_start_date = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "policy_end_date") {
              newExcelDataDump.policy_end_date = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "email") {
              newExcelDataDump.email = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "firstname") {
              newExcelDataDump.first_name = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "gender") {
              newExcelDataDump.gender = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "account_name") {
              newExcelDataDump.account_name = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "phone") {
              newExcelDataDump.phone_number = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "category_name") {
              newExcelDataDump.policy_category = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "dob") {
              newExcelDataDump.Dob = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "zip") {
              newExcelDataDump.zip_code = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "state") {
              newExcelDataDump.state = row.values[i];
            }
            if (worksheet.getRow(1).values[i] == "address") {
              newExcelDataDump.address = row.values[i];
            }
          }
          ExcelDataArray.push(newExcelDataDump);
        }
      });
      console.log(ExcelDataArray);
      // if (ExcelDataArray != null) {
      //   var operations = [];
      //   var responseArray = [];
      //   for (var i = 0; i < ExcelDataArray.length; i++) {
      //     let newExcelData = ExcelDataArray[i];
      //     operations.push(
      //       (function (newExcelData) {
      //         return function (cb) {
      //           policyNew.policyAdd(newExcelData, i, (err, result, index) => {
      //             if (err) {
      //               console.log(err);
      //             } else {
      //               responseArray.push({
      //                 rowNumber: index,
      //                 error: 0,
      //                 data: result,
      //               });
      //               cb(null, { rowNumber: index, error: 0, data: result });
      //             }
      //           });
      //         };
      //       })(newExcelData)
      //     );
      //   }
      //   async.series(operations, (errorAsync, resultAsync) => {
      //     try {
      //       if (errorAsync) {
      //         responseResult.status = true;
      //         responseResult.message = "";
      //         responseResult.data = responseArray;
      //         return res.status(200).send(errorAsync);
      //       } else {
      //         responseResult.status = true;
      //         responseResult.message = "";
      //         responseResult.data = responseArray;
      //         return res.status(200).send(resultAsync);
      //       }
      //     } catch (err) {
      //       console.log(error);
      //     }
      //   });
      // }
      // })
      // .catch((err) => {
      //   console.log(err);
      //   return err;
      // });
    });
  }
  search = (req) => {
    return new Promise((resolve, reject) => {
      let searchData = {
        first_name: { $regex: new RegExp(req, "i") },
      };
      console.log("service", searchData);

      userModel
        .findSearch(searchData)
        .then((data) => {
          console.log(data);
          data.forEach((data) => {
            console.log("data", data._id);

            policyinfoModel
              .find(data._id)
              .then((dataform) => {
                console.log(dataform);
                resolve(dataform);
              })
              .catch((err) => {
                reject(err);
              });
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
