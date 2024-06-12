import { Schema, model } from 'mongoose'

const Blacklist = new Schema({
  token: { type: String, required: true },
  expireAt: { type: Date, required: true, index: { expires: '1h' } }
})

export default model('Blacklist', Blacklist)
