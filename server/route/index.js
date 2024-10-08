const express = require("express");
const controller = require("../controller/userController");
const router = express.Router();
const { userValidatorRules, validate } = require("../middlewares/validator");
const isLoggedIn = require("../middlewares/auth");
const doctorController = require("../controller/doctorController");

router.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

router.post(
  "/account/signup",
  userValidatorRules(),
  validate,
  controller.register
);
router.post("/account/login", controller.login);
router.get("/account/me", isLoggedIn, controller.me);
router.get("/account/profile", isLoggedIn, controller.getProfile);

// PROFILE ACCTIONS
router.put("/account/profile/update", isLoggedIn, controller.updateProfile);
router.delete("/account/profile/delete", isLoggedIn, controller.deleteAccount);

//SEARCH
router.get("/doctors", doctorController.index);

module.exports = router;
