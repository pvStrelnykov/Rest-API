import auctionService from './auction.service.js'
import ApiError from '../error/ApiError.js'

class auctionController {
	async getOne(req, res, next) {
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
			const userId = req.user.id
			const auctions = await auctionService.getAll(userId)
			return res.json(auctions)
		} catch (e) {
			console.log(e.message)
			res.json(e)
		}
	}

	async create(req, res, next) {
		try {
			const userId = req.user.id
			const auction = await auctionService.create(req.body, req.files.img, userId)
			return res.json(auction)
		} catch (e) {
			console.log(e.message)
			res.json(e)
		}
	}

	async update(req, res, next) {
		try {
			const { id } = req.params
			if(!id){
				res.json('not found id')
			}
			const updatedAuction = await auctionService.update(id, req.body, req.files.img)
      return res.json(updatedAuction);
		} catch (e) {
			console.log(e)
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
