const mongoose = require("mongoose");

const missionSchema = mongoose.Schema({
  givenIn: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startedAt: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  responsibility: {
    type: String,
    required: true,
  },
  endedAt: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  belonging: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("missions", missionSchema);
