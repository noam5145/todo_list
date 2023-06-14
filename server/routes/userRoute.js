const router = require("express").Router();
const { userCtrl } = require("../controllers/userCtrl");

router.get("/getUsers", userCtrl.getUsers);
router.post("/setUser", userCtrl.setUser);
router.get("/getUser", userCtrl.getUser);

module.exports = router; 