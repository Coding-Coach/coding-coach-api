import { mongoose } from 'mongoose';
import { bcrypt } from 'bcrypt-nodejs';
import { validate } from 'mongoose-validator';
import { isValidPassword } from 'mongoose-custom-validators';

const { SALT_INDEX } = 10;
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

const UserSchema = new Schema({
  name: {
    first_name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      allowNull: false,
      validate: nameValidator,
    },
    last_name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      allowNull: false,
      validate: nameValidator,
    },
  },

  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    allowNull: false,
    validate: emailValidator,
  },

  social_media: {
    id: String,
    token: String,
    unique: true,
    default: '',

    social_type: {
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
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      trim: true,
    },
  },
});

UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, SALT_INDEX, null);
};

UserSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.local.password);
};
module.exports = mongoose.model('User', UserSchema);
