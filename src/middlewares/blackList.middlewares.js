import Blacklist from '../auth/auth.model.js'
import ApiError from '../error/ApiError.js'

const checkBlacklist = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		const blacklisted = await Blacklist.findOne({ token })
		if (blacklisted) {
			next(ApiError.badRequest('Token is blacklisted'))
		}
	} catch (e) {
		next(ApiError.badRequest('Error checking token blacklist'))
	}
}

export default checkBlacklist
