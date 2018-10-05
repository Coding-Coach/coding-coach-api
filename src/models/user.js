import { mongoose } from 'mongoose';
import { bcrypt } from 'bcrypt-nodejs';
import { validate } from 'mongoose-validator';
import { isValidPassword } from 'mongoose-custom-validators';

const saltIndex = 10;
const { Schema } = mongoose.Schema;

const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 32],
    message: 'Name should be 2 to 32 characters',
  }),
  validate({
    validator: 'isAlphabetical',
    arguments: ['/^[a-zA-Z]*$/+[^s-]'],
    message: 'Name should contain characters from A - Z',
  }),

  validate({
    validator: 'isNumeric',
    no_symbols: false,
    message: 'There can be no +, -, or .',
  }),
];

const emailValidator = [
  validate({
    type: String,
    valiator: 'isLength',
    arguments: [3, 32],
    message: 'Name should be btween {ARGS[0]} and {ARGS[1]} characters',
  }),

  validate({
    validator: 'isEmail',
    message: 'Email address invalid',
  }),
];

const passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 32],
    message: 'Password needs to be between {ARGS[0]} to {ARGS[1]} long',
  }),

  validate({
    valiator: str => isValidPassword(str, { minlength: 10 }),
    message:
      'Password must have at least: 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
  }),
];

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
    allowNull: false,
    validate: nameValidator,
  },

  lastName: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
    allowNull: false,
    validate: nameValidator,
  },

  email: {
    id: Schema.Types.Objectid,
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    allowNull: false,
    validate: emailValidator,
  },

  socialMedia: {
    id: Schema.Types.Objectid,
    socialID: String,
    token: String,
    unique: true,
    default: '',

    socialType: {
      default: 'none',
      type: String,
      enum: ['facebook', 'google', 'twitter', 'github', 'none'],
    },
  },

  password: {
    type: String,
    require: true,
    minlength: 8,
    maxlength: 32,
    trim: true,
    allowNull: false,
    validate: passwordValidator,
  },

  meta: {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      trim: true,
    },
    failedLogin: {
      lastAttempt: Date,
      numFailed: {
        type: Number,
        default: 0,
        max: 5,
      },
    },
  },
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, saltIndex, null);
};

userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', userSchema);
