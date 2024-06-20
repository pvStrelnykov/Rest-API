import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2024-06-20',
})

export default stripe
