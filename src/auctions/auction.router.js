import { Router } from 'express'

import authMiddlewares from '../middlewares/auth.middlewares.js'
import auctionController from './auction.controller.js'

const router = new Router()

router.get('/all', authMiddlewares, auctionController.getAll)
router.post('/create', authMiddlewares, auctionController.create)
router.get('/:id', auctionController.getOne)
router.put('/edit/:id', authMiddlewares, auctionController.update)
router.delete('/delete/:id', authMiddlewares, auctionController.delete)

export default router