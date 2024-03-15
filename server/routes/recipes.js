const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById } = require('../controllers/recipes');

router.route('/')
    .get(getRecipes)

router.route('/:id')
    .get(getRecipeById)

module.exports = router;