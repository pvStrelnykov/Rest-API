import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization

	if (!authHeader) {
		return res.status(401).json({ message: 'Authorization header missing' })
	}

	const token = authHeader.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'Token missing' })
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)

		if (!decoded || !decoded.id) {
			return res.status(401).json({ message: 'Invalid token' })
		}

		req.user = decoded
		next()
	} catch (e) {
		console.error('Token verification error:', e)
		return res.status(401).json({ message: 'Unauthorized' })
	}
}

export default authMiddleware
