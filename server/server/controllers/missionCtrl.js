const missionModel = require('../models/missionModel');
exports.missionCtrl = {
    async addMission(req, res) {
      try {
        let mission = await missionModel.findOne(req.body);
        if(mission){
          return res.status(400).json({err: 'Duplicate misssion'});
        }
        mission = missionModel(req.body);
        mission.save();
        return res.status(200).json(mission);
      } catch (error) {
        return res.status(500).json({err: 'fail'});
      }
    },
    async getMissions(req, res) {
     
    },
  };
  
  