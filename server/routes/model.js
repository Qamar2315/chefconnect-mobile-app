const express = require("express");
const { isLogin } = require("../middlewares/isLogin");
const { validateModel } = require("../middlewares/schemaValidator");
const { generateFoodSuggestions } = require("../controllers/model");
const router = express.Router();

router.route("/predict").post(isLogin, validateModel, generateFoodSuggestions);

module.exports = router;
