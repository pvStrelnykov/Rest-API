import bcrypt from 'bcrypt'
import ApiError from '../error/ApiError.js'
import User from '../models/user.model.js'

class userController {
	async get(req, res, next) {
		try {
			const user = await User.findById(req.params.id)
			if (!user) {
				return next(ApiError.badRequest('User not found'))
			}
			res.json(user)
		} catch (e) {
			console.error('Error when getting a user:', e)
			return next(ApiError.badRequest('Error when getting a user'))
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params
			const updateData = req.body

			if (updateData.password) {
				const hashPassword = await bcrypt.hashSync(updateData.password, 7)
				updateData.password = hashPassword
			}

			const updateUser = await User.findByIdAndUpdate(id, updateData, {
				new: true,
			})

			if (!updateUser) {
				throw ApiError.badRequest('User not found')
			}

			res.json(updateUser)
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
