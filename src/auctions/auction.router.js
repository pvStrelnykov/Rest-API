import { Router } from 'express'

import auctionController from './auction.controller.js'

const router = new Router()

router.get('/all', auctionController.getAll)
router.post('/create', auctionController.create)
router.get('/:id', auctionController.get)
router.put('/edit', auctionController.update)
router.delete('/delete/:id', auctionController.delete)

export default router