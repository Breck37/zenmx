const express = require("express");

const PickCtrl = require("../controllers/pick-controller");

const router = express.Router();

router.post("/save-picks", PickCtrl.savePicks);

module.exports = router;
