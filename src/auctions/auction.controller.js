import auctionService from './auction.service.js'
import Auction from './auction.model.js'
import ApiError from '../error/ApiError.js'

class auctionController {
	async get(req, res, next) {
		try {
			const auction = await auctionService.getOne(req.params.id)
			if(!auction){
				throw ApiError.badRequest('Product not found')
			}
			return res.json(auction)
		} catch (e) {
			console.log(e.message)
			res.json(e)
		}
	}

	async getAll(req, res, next) {
		try {
			const auctions = await auctionService.getAll()
			return res.json(auctions)
		} catch (e) {
			console.log(e.message)
			res.json(e)
		}
	}

	async create(req, res, next) {
		try {
			const auction = await auctionService.create(req.body, req.files.img)
			return res.json(auction)
		} catch (e) {
			console.log(e.message)
			res.json(e)
		}
	}

	async update(req, res, next) {
		try {
			const auction = req.body
			if(!auction._id){
				res.json('not found id')
			}
			const updatedAuction = await Auction.findByIdAndUpdate(auction._id, auction, {new: true})
			return res.json(updatedAuction)
		} catch (e) {
			console.log(e.message)
		}
	}

	async delete(req, res, next) {
		try {
			await auctionService.delete(req.params.id)
			return res.json('Auction has been deleted')
		} catch (e) {
			console.log(e.message)
			res.json(e)
		}
	}
}

export default new auctionController()
