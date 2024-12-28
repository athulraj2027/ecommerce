const bcrypt = require("bcrypt");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

//   USER GET METHODS

const loadHomePage = (req, res) => {
  const userId = req.params.id;

  res.render("user/homepage");
};

const loadShopPage = (req, res) => {
  const userId = req.params.id;

  res.render("user/shopPage");
};

const loadSignInPage = (req, res) => {
  res.render("user/signInPage");
};

const loadSignUpPage = (req, res) => {
  res.render("user/signUpPage");
};

//   USER POST METHODS

const userSignUpController = async (req, res) => {
  const { firstname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    console.log(email);
    if (existingUser) {
      res.render("user/signUpPage"); // user already exists
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

const userSignInController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("user/signUpPage");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("user/signInPage");
    }

    req.session.user = {
      id: user._id,
      email: user.email,
    };
    return res.redirect(`/home:${user._id}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loadHomePage,
  loadShopPage,
  loadSignInPage,
  loadSignUpPage,
  userSignUpController,
  userSignInController,
};
