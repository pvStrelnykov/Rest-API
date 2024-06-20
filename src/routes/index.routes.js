import { Router } from 'express'

import authRouter from './auth.router.js'
import userRouter from './user.router.js'
import auctionRouter from './auction.router.js'
import { processPayment } from '../controllers/payment.controller.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/auctions', auctionRouter)
router.use('/payment/:id', processPayment)

export default router