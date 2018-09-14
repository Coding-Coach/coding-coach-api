import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: 'string',
  type: 'string'
})

export const User = mongoose.model('User', UserSchema)
