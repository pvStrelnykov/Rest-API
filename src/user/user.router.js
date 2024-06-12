import { Router } from 'express'

import authMiddlewares from '../middlewares/auth.middlewares.js'
import userController from './user.controller.js'

const router = new Router()

router.put('/edit/:id', authMiddlewares, userController.update)
router.get('/:id', authMiddlewares, userController.get)
router.delete('/delete/:id', authMiddlewares, userController.delete)

export default router