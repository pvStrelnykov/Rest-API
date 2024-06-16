import ApiError from '../error/ApiError.js'
import Auction from './auction.model.js'
import fileService from './file.service.js'

class auctionService{
	async getOne(id) {
		if(!id){
			throw ApiError.badRequest('Product not found')
		}
		const auction = await Auction.findById(id)
		return auction
	}

	async getAll(userId) {
		const auctions = await Auction.find({ user: userId })
		return auctions
	}

	async create(data, img, userId) {
		const fileName = fileService.saveFile(img)
		const createdAuction = await Auction.create({ ...data, img: fileName, user: userId })
		return createdAuction
	}

	async update(id, data, img) {
    const fileName = fileService.saveFile(img)
    const updatedAuction = await Auction.findByIdAndUpdate(id, { ...data, img: fileName }, { new: true })
    return updatedAuction
	}

	async delete(id) {
		if(!id){
			throw ApiError.badRequest('Product not found')
		}
		const auction = await Auction.findByIdAndDelete(id)
		return auction
	}
}

export default new auctionService()