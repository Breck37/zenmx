const express = require("express");

const UserCtrl = require("../controllers/user-controller");

const router = express.Router();

router.post("/create-user", UserCtrl.createUser);
router.get("/get-user/:email", UserCtrl.getUser);

module.exports = router;
