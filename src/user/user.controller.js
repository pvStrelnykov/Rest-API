import bcrypt from 'bcrypt'
import ApiError from '../error/ApiError.js'
import User from './user.model.js'

class userController {
	async get(req, res, next) {
		try {
			const user = await User.findById(req.params.id)
			if (!user) {
				return next(ApiError.badRequest('User not found'))
			}
			res.json(user)
		} catch (e) {
			return next(ApiError.badRequest('Error when getting a user'))
		}
	}

	async update(req, res, next) {
		try {
			const { username, password } = req.body

			const updateData = { username }
			if (password) {
				const hashPassword = bcrypt.hashSync(password, 7)
				updateData.password = hashPassword
			}

			const updatedUser = await User.findByIdAndUpdate(updateData)
			res.json(updatedUser)
		} catch (e) {
			console.error(e.message)
		}
	}

	async delete(req, res, next) {
		try {
			const user = await User.findByIdAndDelete(req.params.id)
			if (!user) {
				return next(ApiError.badRequest('User not found'))
			}
			res.json('User deleted successfully')
		} catch (e) {
			return next(ApiError.badRequest('Error on deletion'))
		}
	}
}

export default new userController()
