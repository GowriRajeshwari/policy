const logger = require("../logger/logger.js");
const policyService = require("../service/policy");
const policy = new policyService();

module.exports.policyInfo = (req, res) => {
  let response = {};
  let fileupload = req.file.path;
  // res.status(200).send({ data: fileupload });
  policy
    .policyInfo(fileupload)
    .then((data) => {
      response.success = true;
      response.message = "policy Data saved successfully";
      res.status(200).send({ data: response });
    })
    .catch((err) => {
      response.success = false;
      response.message = err;
      res.status(500).send({ data: response });
    });
};
