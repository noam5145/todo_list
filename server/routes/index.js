const router = require("express").Router();

router.get("/", (req, res) => res.status(404).json({ err: "notFound" }));

module.exports = router;
 