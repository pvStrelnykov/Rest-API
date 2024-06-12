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

	async getAll() {
		const auctions = await Auction.find()
		return auctions
	}

	async create(data, img, userId) {
		const fileName = fileService.saveFile(img)
		const createdAuction = await Auction.create({ ...data, img: fileName, user: userId })
		return createdAuction
	}

	async update(id) {
		
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