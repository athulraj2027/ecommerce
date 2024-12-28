const express = require("express");
const router = express.Router();
const {
  loadHomePage,
  loadShopPage,
  loadSignInPage,
  loadSignUpPage,
  userSignUpController,
  userSignInController,
} = require("../controllers/userController");

router.get("/home:id", loadHomePage);
router.get("/shop:id", loadShopPage);
router.get("/", loadSignInPage);
router.get("/signup", loadSignUpPage);

router.post("/signup", userSignUpController);
router.post("/", userSignInController);

module.exports = router;
