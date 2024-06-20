import stripe from '../config/stripe.js'

import auctionService from '../services/auction.service.js'

export const processPayment = async (req, res) => {
	const { id } = req.params
	const { currency, paymentMethodId, description } = req.body

	console.log(id);

	try {
		const product = await auctionService.getOne(id)
		if (!product) {
			return res.status(404).json({ success: false, error: 'Product not found' })
		}
		const productPrice = product.price
		const paymentIntent = await stripe.paymentIntents.create({
			amount: productPrice,
			currency,
			payment_method: paymentMethodId,
			confirm: true,
			description,
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: 'never',
			},
		})

		res.status(200).json({
			success: true,
			paymentIntentId: paymentIntent.id,
			status: paymentIntent.status,
			productId: id,
		})
	} catch (error) {
		res.status(400).json({ success: false, error: error.message })
	}
}
