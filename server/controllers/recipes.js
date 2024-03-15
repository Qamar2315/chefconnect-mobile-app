const asyncHandler = require('../utilities/CatchAsync')
const Recipe = require('../model/recipe')
const AppError = require('../utilities/AppError')

const getRecipes = asyncHandler(async (req, res) => {
    // Fetch all recipes from the database
    const recipes = await Recipe.find({});
    if (recipes) {
        res.status(200).json({
            success: true,
            data: constituents
        });
    }else{
        throw new AppError("Internal Server Error",400)
    }
})

// const addConstituent = asyncHandler(async (req, res) => {
//     const { email, name, address } = req.body;
//     // Check if a constituent with the same email exists
//     let existingConstituent = await Constituent.findOne({ email });

//     if (existingConstituent) {
//         // If a constituent with the same email exists, merge data
//         existingConstituent.name = name || existingConstituent.name;
//         existingConstituent.address = address || existingConstituent.address;

//         // Save the updated constituent
//         await existingConstituent.save();

//         res.status(200).json({
//             success: true,
//             message: 'Constituent data updated successfully',
//             data: existingConstituent
//         });
//     } else {
//         // If no constituent with the same email exists, create a new one
//         const newConstituent = new Constituent({
//             email,
//             name,
//             address
//         });

//         // Save the new constituent
//         await newConstituent.save();

//         res.status(201).json({
//             success: true,
//             message: 'Constituent added successfully',
//             data: newConstituent
//         });
//     }
// });



module.exports = {
    getRecipes
}