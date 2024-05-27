const asyncHandler = require("../utilities/CatchAsync");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const generateFoodSuggestions = asyncHandler(async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  try {
    const { diet, mealType, time, nutritionalGoals, cuisine } = req.body;

    // Construct a structured prompt with specific details
    const prompt = `Generate 7 dish ideas that match the following criteria:
        Diet: ${diet}
        Meal Type: ${mealType}
        Time: ${time}
        Nutritional Goals: ${nutritionalGoals}
        Cuisine: ${cuisine}
        Output format: Each idea should be represented as an object with 'ideaTitle' and 'ideaDescription' fields. In the form: [{ideaTitle: '...', ideaDescription: '...'}, ...].Should be JSON Array only`;

    const result = await model.generateContent(prompt);
    let response = result.response;
    // Remove ```json and last ```
    let jsonString = response.text().replace(/^```json\s+/, "").replace(/\s+```$/, "");
    // Parse the response into a JSON array
    try {
      console.log(jsonString);
      const jsonArray = JSON.parse(jsonString);
      res.status(200).json({
        success: true,
        message: "Ideas generated successfully",
        data: jsonArray,
      });
    } catch (err) {
      res.status(200).json({
        success: false,
        message: "Some error please try again",
        data: [],
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = { generateFoodSuggestions };
