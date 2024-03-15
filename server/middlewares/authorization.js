const asyncHandler = require('../utilities/CatchAsync');
const AppError = require('../utilities/AppError');

const isProfileAuthor = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user._id) {
        throw new AppError("Not Authorized", 401);
    }
next();
});

module.exports = {
    isProfileAuthor
}