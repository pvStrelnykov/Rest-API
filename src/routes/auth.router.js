import { Router } from 'express'
import { check } from 'express-validator'

import authController from '../controllers/auth.controller.js'
import authMiddlewares from '../middlewares/auth.middlewares.js'

const router = new Router()



/**
 * @swagger
 * /auth/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation errors
 */
router.post('/registration', [
	check('username', 'The field can\'t be empty').notEmpty(),
	check('password', 'The field can\'t be empty').notEmpty()
], authController.registration)


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: testuser
 *               password:
 *                 type: string
 *                 example: testpassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation errors
 */
router.post('/login', authController.login)
router.post('/logout', authMiddlewares, authController.logout)

export default router