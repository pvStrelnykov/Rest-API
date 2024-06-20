import { Schema, model } from 'mongoose'

const Auction = new Schema({
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	img: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
	timestamps: true
})

export default model('Auction', Auction)