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
module.exports = class PolicyAdd {
  policyAdd(operation) {
    return new Promise((resolve, reject) => {
      console.log(operation);
      agentService
        .addAgent({
          agent_name: operation.agent_name,
        })
        .then((agentServiceData) => {
          userAccountService
            .userAccount({ account_name: operation.account_name })
            .then((userAccountServiceData) => {
              let userData = {
                first_name: operation.first_name,
                Dob: operation.Dob,
                email: operation.email,
                phone_number: operation.phone_number,
                zip_code: operation.zip_code,
                state: operation.state,
                address: operation.address,
                // gender: operation.gender,
                user_type: operation.user_type,
              };
              userService
                .user(userData)
                .then((userServicData) => {
                  policyCarrierService
                    .policyCarrier({
                      company_name: operation.company_name,
                    })
                    .then((policyCarrierServiceData) => {
                      policyCategoryService
                        .policyCategory({
                          category_name: operation.category_name,
                        })
                        .then((policyCategoryServiceData) => {
                          var policy = {
                            policy_number: operation.policy_number,
                            policy_start_date: operation.policy_start_date,
                            policy_end_date: operation.policy_end_date,
                            policy_category: operation.policy_category,
                            agent_id: agentServiceData._id,
                            user_id: userServicData._id,
                            user_account_id: userAccountServiceData._id,
                            policy_category_id: policyCategoryServiceData._id,
                            policy_carrier_id: policyCarrierServiceData._id,
                          };

                          // await operation.push(policy);
                          // console.log(operation);
                          policyInfoService
                            .policyInfo(policy)
                            .then((data) => {
                              // console.log(data);
                              resolve(data);
                            })
                            .catch((err) => {
                              console.log("err");
                              reject(err);
                            });
                        })
                        .catch((err) => {
                          reject(err);
                        });
                    })
                    .catch((err) => {
                      reject(err);
                    });
                })
                .catch((err) => {
                  reject(err);
                });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
