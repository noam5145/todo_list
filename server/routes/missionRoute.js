const router = require("express").Router();
const { missionCtrl } = require("../controllers/missionCtrl");

router.post("/", missionCtrl.addMission);

module.exports = router;
 