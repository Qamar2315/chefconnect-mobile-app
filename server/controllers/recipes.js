const asyncHandler = require('../utilities/CatchAsync')
const Recipe = require('../model/recipe')
const Review = require('../model/review')
const AppError = require('../utilities/AppError')

const getRecipes = asyncHandler(async (req, res) => {
    // Fetch all recipes from the database
    const recipes = await Recipe.find({});
    if (recipes) {
        res.status(200).json({
            success: true,
            data: recipes
        });
    } else {
        throw new AppError("Internal Server Error", 400)
    }
})

const getRecipeById = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get recipe ID from request parameters

    // Fetch the recipe from the database using the ID
    const recipe = await Recipe.findById(id)
        .populate({
            path: 'author',
            select: 'name email' // Specify the fields you want to populate for the author
        })
        .populate({
            path: 'reviews',
            populate: { path: 'user', select: 'name' } // Populate nested fields within reviews (assuming there's a 'user' field in reviews)
        });

    if (!recipe) {
        return res.status(404).json({
            success: false,
            message: 'Recipe not found'
        });
    }

    res.status(200).json({
        success: true,
        data: recipe
    });
});


const addRecipe = asyncHandler(async (req, res) => {
    const { title, description, ingredients, instructions, cookingTime, servings, category, tags } = req.body;

    // Check if a recipe with the same title exists
    let existingRecipe = await Recipe.findOne({ title });

    if (existingRecipe) {
        // If a recipe with the same title exists, update data
        existingRecipe.title = title || existingRecipe.title;
        existingRecipe.description = description || existingRecipe.description;
        existingRecipe.ingredients = ingredients || existingRecipe.ingredients;
        existingRecipe.instructions = instructions || existingRecipe.instructions;
        existingRecipe.cookingTime = cookingTime || existingRecipe.cookingTime;
        existingRecipe.servings = servings || existingRecipe.servings;
        existingRecipe.category = category || existingRecipe.category;
        existingRecipe.tags = tags || existingRecipe.tags;
        existingRecipe.updatedAt = Date.now();

        // Save the updated recipe
        await existingRecipe.save();

        res.status(200).json({
            success: true,
            message: 'Recipe data updated successfully',
            data: existingRecipe
        });
    } else {
        // If no recipe with the same title exists, create a new one
        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            instructions,
            cookingTime,
            servings,
            author: req.user._id,
            category,
            tags
        });

        // Save the new recipe
        await newRecipe.save();

        res.status(201).json({
            success: true,
            message: 'Recipe added successfully',
            data: newRecipe
        });
    }
});


const updateRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get recipe ID from request parameters
    const { title, description, ingredients, instructions, cookingTime, servings, category, tags } = req.body;

    // Check if the recipe with the given ID exists
    let recipe = await Recipe.findById(id);

    if (!recipe) {
        return res.status(404).json({
            success: false,
            message: 'Recipe not found'
        });
    }

    // Update recipe fields
    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.cookingTime = cookingTime || recipe.cookingTime;
    recipe.servings = servings || recipe.servings;
    recipe.category = category || recipe.category;
    recipe.tags = tags || recipe.tags;
    recipe.updatedAt = Date.now();

    // Save the updated recipe
    await recipe.save();

    res.status(200).json({
        success: true,
        message: 'Recipe updated successfully',
        data: recipe
    });
});

const deleteRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get recipe ID from request parameters

    try {
        // Check if the recipe with the given ID exists
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        }

        // Delete associated reviews
        await Review.deleteMany({ _id: { $in: recipe.reviews } });

        // Delete the recipe
        await Recipe.deleteOne({ _id: id });

        res.status(200).json({
            success: true,
            message: 'Recipe and associated reviews deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

// POST /api/recipes/:id/reviews
const addReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { rating, description } = req.body;

    // Check if the recipe with the given ID exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new AppError('Recipe not found', 404);
    }

    // Create a new review
    const newReview = new Review({
        rating,
        description,
        author: req.user._id // Assuming you have user authentication and req.user contains user info
    });

    // Save the new review
    await newReview.save();

    // Add the review ID to the recipe's reviews array
    recipe.reviews.push(newReview._id);
    await recipe.save();

    res.status(201).json({
        success: true,
        message: 'Review added successfully',
        data: newReview
    });
});

// DELETE /api/recipes/:id/reviews/:rId
const deleteReview = asyncHandler(async (req, res) => {
    const { id, rId } = req.params;

    // Check if the review with the given ID exists
    const review = await Review.findById(rId);
    if (!review) {
        throw new AppError('Review not found', 404);
    }

    // Check if the recipe with the given ID exists
    const recipe = await Recipe.findById(id);
    if (!recipe) {
        throw new AppError('Recipe not found', 404);
    }

    // Remove the review ID from the recipe's reviews array
    recipe.reviews.pull(rId);
    await recipe.save();

    // Delete the review
    await Review.findByIdAndDelete(rId);

    res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        data: {}
    });
});


module.exports = {
    getRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeById,
    addReview,
    deleteReview
}