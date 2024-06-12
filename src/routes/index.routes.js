import { Router } from 'express'

import authRouter from '../auth/auth.router.js'
import userRouter from '../user/user.router.js'
import auctionRouter from '../auctions/auction.router.js'

const router = new Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/auctions', auctionRouter)

export default router