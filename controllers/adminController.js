const User = require("../models/user");
const Product = require("../models/product");
const Category = require("../models/category");

const loadSignInPage = (req, res) => {
  res.render("admin/signInPage");
};

const loadDashboard = (req, res) => {
  res.render("admin/dashboard");
};

const loadOrdersPage = (req, res) => {
  res.render("admin/order");
};

const loadProductsPage = (req, res) => {
  res.render("admin/products");
};

const loadCategoriesPage = (req, res) => {
  res.render("admin/categories");
};

const loadAddCategoriesPage = async (req, res) => {
  res.render("admin/addCategory");
};

const loadCustomersPage = (req, res) => {
  res.render("admin/customers");
};

const loadCouponsPage = (req, res) => {
  res.render("admin/coupons");
};

const loadAddProductPage = (req, res) => {
  res.render("admin/addProduct");
};

const adminLoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("admin/signInPage");
    }
    if (!user.role) {
      return res.render("admin/signInPage");
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("admin/signInPage");
    }

    req.session.user = {
      id: user._id,
      password: user.password,
    };
    return res.redirect("/admin/dashboard");
  } catch (err) {
    console.log(err);
  }
};

const adminAddProductController = async (req, res) => {
  const {
    productName,
    productPrice,
    productDescription,
    productVariant,
    // productImage,
    productCategory,
    productTags,
  } = req.body;
  if (
    !productName ||
    !productPrice ||
    !productDescription ||
    !productVariant ||
    !productCategory ||
    !req.file
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required, including an image." });
  }

  const productImage = req.file.path;

  const newProduct = new Product({
    name: productName,
    price: productPrice,
    description: productDescription,
    variant: productVariant,
    image: productImage,
    category: productCategory,
    tags: productTags ? productTags.split(",") : [], // Convert tags to an array if provided
  });
  try {
    await newProduct.save();

    res.redirect("admin/products");
  } catch (error) {
    console.error("Error adding product:", error);
    res.render("admin/products");
  }
};

const adminAddCategoryController = async (req, res) => {
  const { categoryName, categoryDescription, categoryImage, existingProducts } =
    req.body;

  if (
    !categoryName ||
    !categoryDescription ||
    !categoryImage ||
    !existingProducts
  ) {
    res.status(400);
  }
  const category = await Category.findOne({ categoryName });
  if (category) {
    return res.render("admin/categories");
  }
  const newCategory = new Category({
    name: categoryName,
    description: categoryDescription,
    image: categoryImage,
    products: existingProducts,
  });
  try {
    await newCategory.save();

    return res.render("admin/categories");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  loadSignInPage,
  loadDashboard,
  loadOrdersPage,
  loadProductsPage,
  loadAddProductPage,
  adminAddProductController,
  loadCategoriesPage,
  loadCustomersPage,
  loadCouponsPage,
  adminLoginController,
  loadAddCategoriesPage,
  adminAddCategoryController,
};
