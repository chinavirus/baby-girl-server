const httpStatus = require('http-status');
const { BabyGirl } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} babyGirlBody
 * @returns {Promise<BabyGirl>}
 */
const createBabyGirl = async (babyGirlBody) => {
    return await BabyGirl.create(babyGirlBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBabyGirls = async (filter, options) => {
    //const girls = await BabyGirl.paginate(filter, options); 
    const girls = await BabyGirl.aggregate(
        [ { $sample: { size: 10 } } ]
    )
    return {
        code: 200,
        results: girls
    }
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
    return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
    return user;
};

module.exports = {
    createBabyGirl,
    queryBabyGirls,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};