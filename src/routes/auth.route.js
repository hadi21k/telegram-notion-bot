const { Router } = require("express");
const { exChangeCodeForToken } = require("../controllers/auth.controller");
const router = Router();

router.get("/notion/callback", exChangeCodeForToken);

module.exports = router;
