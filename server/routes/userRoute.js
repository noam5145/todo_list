const router = require("express").Router();
const { userCtrl } = require("../controllers/userCtrl");

router.get("/getUsers", userCtrl.getUsers);
router.post("/setUser", userCtrl.setUser);

module.exports = router; 