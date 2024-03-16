const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipes');
const { isLogin } = require("../middlewares/isLogin");
const { isRecipeAuthor } = require("../middlewares/authorization");
const { validateRecipe } = require("../middlewares/schemaValidator");

router.route('/')
    .get(getRecipes)
    .post(isLogin, validateRecipe, addRecipe)

router.route('/:id')
    .get(getRecipeById)
    .put(isLogin, validateRecipe , isRecipeAuthor, updateRecipe)
    .delete(isLogin, isRecipeAuthor, deleteRecipe)

module.exports = router;