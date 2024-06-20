import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ApiError from '../error/ApiError.js'
import Blacklist from '../models/auth.model.js'
import UserModel from '../models/user.model.js'

const generateAccessToken = id => {
	const payload = { id }
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class authService {
	async registration(username, password) {
		const candidate = await UserModel.findOne({ username })
		if (candidate) {
			throw ApiError.badRequest('User exists')
		}
		const hashPassword = bcrypt.hashSync(password, 7)
		const user = await UserModel.create({ username, password: hashPassword })
		await user.save()
		const token = generateAccessToken(user._id)
		return { token, user }
	}

	async login(username, password) {
		const user = await UserModel.findOne({ username })
		if (!user) {
			throw ApiError.badRequest('User not found')
		}
		const isPassEquals = await bcrypt.compare(password, user.password)
		if (!isPassEquals) {
			throw ApiError.badRequest('Invalid password')
		}
		const token = generateAccessToken(user._id)
		return { token, user }
	}

	async logout(token) {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		const expireAt = new Date(decoded.exp * 1000)
		await Blacklist.create({ token, expireAt })
	}
}

export default new authService()
