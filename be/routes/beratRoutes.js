const express = require("express");
const beratController = require("../controllers/beratController");
const router = express.Router();

router.get("/", beratController.getBeratList);
router.get("/:id", beratController.getBeratDetail);
router.post("/", beratController.addBerat);
router.put("/berat/:id", beratController.updateBerat);
router.delete("/berat/:id", beratController.deleteBerat);

module.exports = router;
