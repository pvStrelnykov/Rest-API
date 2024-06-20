import { validationResult } from 'express-validator'
import ApiError from '../error/ApiError.js'
import authService from '../services/auth.service.js'

class authController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest('Validation errors', errors.array()))
			}
			const { username, password } = req.body
			const userData = await authService.registration(username, password)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const { username, password } = req.body
			const userData = await authService.login(username, password)
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const token = req.headers.authorization.split(' ')[1]
			await authService.logout(token)
			res.json({ message: 'Logged out successfully' })
		} catch (e) {
			next(e)
		}
	}
}

export default new authController()
