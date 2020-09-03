const express = require("express");
const router = express.Router();
const policyController = require("../controller/policy.js");
const policyService = require("../service/policy.js");
const policyinfo = new policyService();
const upload = require("../service/multer.js");

router.post("/policyInfo", upload.single("file"), policyinfo.policyInfo);
router.get("/policyInfo/:query", policyController.searchPolicyInfo);
router.post("/message", policyController.messageAdd);

module.exports = router;
