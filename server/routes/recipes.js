const express= require('express');
const router= express.Router();
const {getRecipes} = require('../controllers/recipes');
// 
// const {addConstituent,getConstituents,checkDuplicates,generateCsv} = require('../controllers/constituents');
// const {validateConstituent} = require('../middlewares/schemaValidator')

router.route('/')
    .get(getRecipes)
    // .post(validateConstituent,addConstituent)

router.route('/:id')
    .get()

// router.route('/export')
//     .get(generateCsv)

module.exports=router