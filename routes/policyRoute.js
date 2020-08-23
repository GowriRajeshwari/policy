const express = require("express");
const router = express.Router();
const policyController = require("../controller/policy.js");
const upload = require("../service/multer.js");

router.post("/csvFile", upload.single("file"), policyController.policyInfo);

module.exports = router;
