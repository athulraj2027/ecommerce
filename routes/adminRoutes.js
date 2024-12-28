const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const {
  loadSignInPage,
  adminLoginController,

  loadDashboard,
  loadOrdersPage,

  loadProductsPage,
  loadAddProductPage,
  adminAddProductController,

  loadCategoriesPage,
  adminAddCategoryController,

  loadCustomersPage,
  loadCouponsPage,

  loadAddCategoriesPage,
} = require("../controllers/adminController");

router.get("/", loadSignInPage);

router.get("/dashboard", loadDashboard);
router.get("/orders", loadOrdersPage);

router.get("/products", loadProductsPage);
router.get("/products/add", loadAddProductPage);

router.get("/categories", loadCategoriesPage);
router.get("/categories/add", loadAddCategoriesPage);
router.post("/categories/add", adminAddCategoryController);

router.get("/customers", loadCustomersPage);
router.get("/coupons", loadCouponsPage);

router.post("/", adminLoginController);
router.post(
  "/products/add",
  upload.single("productImage"),
  adminAddProductController
);

module.exports = router;
