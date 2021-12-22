const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const babyGirlSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
babyGirlSchema.plugin(toJSON);
babyGirlSchema.plugin(paginate);




/**
 * @typedef BabyGirl
 */
const BabyGirl = mongoose.model('BabyGirl', babyGirlSchema, 'col_image');

module.exports = BabyGirl;
