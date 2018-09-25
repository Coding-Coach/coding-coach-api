const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const SALT_INDEX = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  name: {
    first_name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    last_name: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    }
  },
  
  email: {
    type:String,
    require: true,
    lowercase: true,
    trim: true,
    allowNull: false,
      validate: {
        len: [1, 128]
      }
  },

  social_media:{
    social_type: {
      default: 'none',
      type: String,
      enum:['facebook', 'google', 'twitter', 'github', 'none'],
    },

    id: String,
    token: String,
  },

  password: {
      type: String,
      require: true,
      minlength: 8,
      maxlength: 32,
      trim: true,
      allowNull: false,
      validate: {
        len: [8, 32]
      }
  },

  meta: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      trim: true,
      validate: {
        timestamps: Date,
      }
    },
   
  }
});
/// Methonds ------
//generating hash 
UserSchema.methods.generateHash = (password)=>{
  return bcrypt.hash(password, SALT_INDEX).then((hash) => {
    //Store hash in your password DB
  });
};

//check if password is valid
UserSchema.methods.validPassword = (password)=>{
  return bcrypt.compare(password, hash, (err, res)=> {
    if(res) {
      //password match
    }else {
      //password dont match
    }
  });
}

const User = mongoose.model('User', UserSchema);
export default User;


//https://medium.com/silibrain/using-passport-bcrypt-for-full-stack-app-user-authentication-fe30a013604e
//https://github.com/scotch-io/easy-node-authentication/blob/master/config/passport.js#L58

//dow we wat to us UUID?