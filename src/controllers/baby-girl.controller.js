const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { babyGirlService } = require('../services');

const createBabyGirl = catchAsync(async (req, res) => {
    const baby = await babyGirlService.createBabyGirl(req.body);
    res.status(httpStatus.CREATED).send(baby);
});

const getBabyGirls = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['status', 'success']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await babyGirlService.queryBabyGirls(filter, options);
    res.send(result);
});

const getUser = catchAsync(async (req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    createBabyGirl,
    getBabyGirls,
    getUser,
    updateUser,
    deleteUser,
};
