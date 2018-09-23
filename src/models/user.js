import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: 'string',
  type: 'string',
});

const User = mongoose.model('User', UserSchema);
export default User;
