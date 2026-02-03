const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");

router.get("/", menuController.getMenuItems);
router.get("/search", menuController.searchMenuItems);
router.get("/:id", menuController.getMenuItem);
router.post("/", menuController.createMenuItem);
router.put("/:id", menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);
router.patch("/:id/availability", menuController.toggleAvailability);

module.exports = router;